import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header/Header';

function SingleUserPage() {
   const {singleUID} = useParams()
   const [user, setUser] = useState({})
    useEffect(()=>{
        const FetchUserData = async ()=>{
          try {
            const response = await axios.get(`http://localhost:8003/api/matrimony/profile/getProfile/${singleUID}`)
            setUser(response.data)
          } catch (error) {
            console.log(error);
          }
        }
        FetchUserData()
    },[])

  return (
    <div>
      <Header/>
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <div className="rounded overflow-hidden shadow-lg p-4">
          <img className="w-full mb-4" src={user.imageUrl || 'default-image-url.jpg'} alt="Profile" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{user.firstName}</div>
            <p className="text-gray-700 text-base">Age: {user.age}</p>
            <p className="text-gray-700 text-base">State: {user.state}</p>
            <p className="text-gray-700 text-base">District: {user.district}</p>
            <p className="text-gray-700 text-base">Profession: {user.profession}</p>
            <p className="text-gray-700 text-base">Education: {user.education}</p>
            <p className="text-gray-700 text-base">Qualification: {user.qualification}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleUserPage