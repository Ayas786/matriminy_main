import React, { useEffect, useState } from 'react';
import HomeHeader from '../../components/homeHeader/HomeHeader';
import useFetch from '../../context/customHooks/useFetch';
import axios from 'axios';
import axiosInstance from '../../context/customHooks/RefreshTokenAxios';
function Home() {
  const [userID, setUserID] = useState();
  // const { data, loading, error } = useFetch('http://localhost:8003/api/auth/authenticatedUserId', {
  //   withCredentials: true
  // });
  const fetchData = async()=>{
    const res =  await axiosInstance.get('/auth/authenticatedUserId', {
      withCredentials: true})
      console.log(res);
  }

  fetchData()
   
//   useEffect(()=>{
//     setUserID(data.user)
//   },[data])
//  console.log(userID);

  return (
    <div>
      <HomeHeader />
    </div>
  );
}

export default Home;
