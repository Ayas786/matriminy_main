import React, { useEffect, useState } from 'react';
import propic from '../../../../assets/profile/OIP.jpg';
import axios from 'axios';

function ConnectedAcceptedPeopleList({ accept, userProfileId }) {
    const [otherUserProfileId, setOtherUserProfileId] = useState(null);
    const [otherUserProfileData, setOtherUserProfileData] = useState(null);

    useEffect(() => {
        if (accept) {
            const friendId = accept.members.find((m) => m !== userProfileId);
            setOtherUserProfileId(friendId);
        }
    }, [accept, userProfileId]);

    useEffect(() => {
        const fetchProfileDataOfOtherUser = async () => {
            if (otherUserProfileId) {
                try {
                    const response = await axios.get(`http://localhost:8003/api/matrimony/profile/getProfile/${otherUserProfileId}`);
                    setOtherUserProfileData(response.data);
                } catch (error) {
                    console.error('Failed to fetch profile:', error);
                }
            }
        };
        fetchProfileDataOfOtherUser();
    }, [otherUserProfileId]);

    return (
        <div className='conversation'>
            <img src={propic} className='conversationImage' alt="" />
            <span className='conversationName'>{otherUserProfileData?.firstName}</span>
        </div>
    );
}

export default ConnectedAcceptedPeopleList;
