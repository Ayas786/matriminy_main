import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AcceptList({ accept, currentProfileId }) {
  const [profileId, setProfileId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accept.fromUID === currentProfileId) {
      setProfileId(accept.toUID);
    } else {
      setProfileId(accept.fromUID);
    }
  }, [accept, currentProfileId]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!profileId) return;
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8083/api/matrimony/profile/getProfile/${profileId}`);
        setProfileData(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(profileData); // Debugging: Log the profile data

  return (
    <div>
      <div className="request-item">
        <div className="user-photo">
          <img src={profileData?.photoUrl || ''} alt="User Photo" />
        </div>
        <div className="user-details">
          <div>
            <p>Name: {profileData?.firstName}</p>
            <p>Profession: {profileData?.profession}</p>
          </div>
          <div>
            <p>Age: {profileData?.age}</p>
            <p>Qualification: {profileData?.qualification}</p>
          </div>
          <div>
            <p>Caste: {profileData?.caste}</p>
            <p>Religion: {profileData?.religion}</p>
          </div>
        </div>
        <div className="actions">
          <button className="accept-btn">Accepted</button>
        </div>
      </div>
    </div>
  );
}

export default AcceptList;
