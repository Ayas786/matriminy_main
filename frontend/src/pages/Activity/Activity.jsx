import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/Header';
import RequestList from './RequestList';
import useFetch from '../../context/customHooks/useFetch';
import { Circles } from 'react-loader-spinner';
import './activity.css';

function Activity() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState(null);
  const { data, loading, error } = useFetch('http://localhost:8003/api/auth/authenticatedUserId', {
    withCredentials: true
  });

  useEffect(() => {
   setUserID(data.user)
  }, [data]);

  console.log(userID);

  useEffect(() => {
    const findProfileIdByUserId = async () => {
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:8003/api/matrimony/profile/getProfileByUserID/${userID}`, {
            withCredentials: true
          });
          setProfile(response.data);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      }
    };
    findProfileIdByUserId();
    if(profile){
      const findReceviedRequest = async()=>{
        try{
          const response = await axios.get(`http://localhost:8003/api/matrimony/profile/listOfRequests/${profile}`,{
            withCredentials:true
          })
          setRequests(response.data)
        }catch(error){
          console.error('Failed to fetch profile:', error);
        }
      }
      findReceviedRequest()
    }
  }, [userID,profile]);


  const handleNavigation = (path) => {
    navigate(path);
  };
 
  return (
    <div>
      <Header />
      <div className='mainContainer'>
        <div className='subheaderMain'>
          <div className="subheader">
            <div className='subdiv'>
              <span className='activeTag' onClick={() => handleNavigation('/activities')}>Request</span>
            </div>
            <div>
              <span onClick={() => handleNavigation('/sent')}>Sent</span>
            </div>
            <div>
              <span onClick={() => handleNavigation('/accept')}>Accepted</span>
            </div>
            <div>
              <span onClick={() => handleNavigation('/reject')}>Reject</span>
            </div>
            <div>
              <span onClick={() => handleNavigation('/chat')}>Chat</span>
            </div>
          </div>
        </div>

        <div className="content-box">
          <div className='subContent-BoxContainer'>
            <div className='subContent-Box'>
            {requests ? (
                requests.map((requests, index) => (
                  <RequestList key={index} request={requests} />
                ))
              ) : (
                <div className="loader-container">
                  <Circles
                    height="100"
                    width="100"
                    color="black"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
