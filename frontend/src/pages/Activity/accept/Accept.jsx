import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/header/Header'
import useFetch from '../../../context/customHooks/useFetch';
import AcceptList from './AcceptList'
import axios from 'axios';
import { Circles } from 'react-loader-spinner';

function Accept() {
    const navigate = useNavigate()
    const [userID, setUserID] = useState(null);
    const [profile, setProfile] = useState(null);
    const [acceptedList, setAcceptedList] = useState(null);
    const { data, loading, error } = useFetch('http://localhost:8083/api/auth/authenticatedUserId', {
      withCredentials: true
    });

    useEffect(() => {
      setUserID(data.user)
     }, [data]);
 
     useEffect(() => {
      const findProfileIdByUserId = async () => {
        if (userID) {
          try {
            const response = await axios.get(`http://localhost:8083/api/matrimony/profile/getProfileByUserID/${userID}`, {
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
            const response = await axios.get(`http://localhost:8083/api/matrimony/profile/listOfAccepted/${profile}`,{
              withCredentials:true
            })
            setAcceptedList(response.data)
          }catch(error){
            console.error('Failed to fetch profile:', error);
          }
        }
        findReceviedRequest()
      }
    }, [userID,profile]);

    
  

  const handleNavigation=(path)=>{
    navigate(path)
  }
  return (
    <div>
      <Header/>
      <div className='mainContainer'>
        <div className='subheaderMain'>
          <div className="subheader">
            <div className='subdiv'>
              <span onClick={()=>handleNavigation('/activities')}>Request</span>
            </div>
            <div>
              <span onClick={()=>handleNavigation('/sent')}>Sent</span>
            </div>
            <div>
              <span className='activeTag' onClick={()=>handleNavigation('/accept')}>Accepted</span>
            </div>
            <div>
              <span onClick={()=>handleNavigation('/reject')}>Reject</span>
            </div>
            <div>
              <span onClick={()=>handleNavigation('/chat')}>Chat</span>
            </div>
          </div>
        </div>

        <div className="content-box">
          <div className='subContent-BoxContainer'>
            <div className='subContent-Box'>
            {acceptedList ? (
              acceptedList.map((accept, index) => (
                <AcceptList key={index} accept={accept} currentProfileId={profile}/>
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
  )
}

export default Accept