import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header/Header';
import useFetch from '../../../context/customHooks/useFetch';
import axios from 'axios';
import ChatApp from './ChatApp';

function Chat() {
    const navigate = useNavigate();;
    const [loggedUserProfileId, setLoggedUserProfileId] = useState(null);
    const { data } = useFetch('http://localhost:8003/api/auth/authenticatedUserId', {
        withCredentials: true
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (data.user) {
                try {
                    const response = await axios.get(`http://localhost:8003/api/matrimony/profile/getProfileByUserID/${data.user}`, {
                        withCredentials: true
                    });
                    setLoggedUserProfileId(response.data);
                } catch (error) {
                    console.error('Failed to fetch profile:', error);
                }
            }
        };

        fetchUserProfile();
    }, [data]);

 


    // useEffect(()=>{
    //     const updateConverstionOfUser = async () => {
    //             try {
    //                 const response = await axios.post(`http://localhost:8003/api/matrimony/conversation/create-conversations/${loggedUserProfileId}`);
    //                 console.log('updateConverstionOfUSer', response);
    //             } catch (error) {
    //                 console.error('Failed to update conversation:', error);
    //         }
    //     };
    //     updateConverstionOfUser()
    // },[loggedUserProfileId])

    const onClickRequest=(path)=>{
        navigate(path)
    }

    return (
        <div>
            <Header />
            <div className='mainContainer'>
                <div className='subheaderMain'>
                    <div className="subheader">
                        <div className='subdiv'>
                            <span onClick={() => onClickRequest('/activities')}>Request</span>
                        </div>
                        <div>
                            <span onClick={() => onClickRequest('/sent')}>Sent</span>
                        </div>
                        <div>
                            <span onClick={() => onClickRequest('/accept')}>Accepted</span>
                        </div>
                        <div>
                            <span onClick={() => onClickRequest('/reject')}>Reject</span>
                        </div>
                        <div>
                            <span className='activeTag' onClick={() => onClickRequest('/chat')}>Chat</span>
                        </div>
                    </div>
                </div>
            </div>
            <ChatApp currentUserProfileId={loggedUserProfileId} />
        </div>
    );
}

export default Chat;
