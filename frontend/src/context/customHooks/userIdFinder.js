import { useEffect, useState } from 'react';
import axios from 'axios';
import useFetch from './useFetch';

const userIDFinder = () => {
  const [userID, setUserID] = useState(null);
  const { data, loading, error } = useFetch('http://localhost:8083/api/auth/authenticatedUserId', {
    withCredentials: true
  });

  useEffect(() => {
   setUserID(data.user)
  }, [data]);

  console.log(userID);

  return { userID, loading, error };
};

export default userIDFinder;
