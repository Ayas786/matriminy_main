import { useEffect, useState } from 'react';
import axios from 'axios';

const profileFinder = (userID) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userID) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8083/api/matrimony/profile/getProfileByUserID/${userID}`, {
            withCredentials: true
          });
          setProfile(response.data);
        } catch (error) {
          setError(error);
          console.error('Failed to fetch profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [userID]);

  return { profile, loading, error };
};

export default profileFinder;
