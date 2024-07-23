import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function RequestList({request}) {
 
  const [requestData,setRequestData]= useState({})
  useEffect(()=>{
    const findProfileOfFromUser = async()=>{
      const response = await axios.get(`http://localhost:8083/api/matrimony/profile/getProfile/${request.fromUID}`)
      setRequestData(response.data)
    }
    findProfileOfFromUser()
  },[request.fromUID])


  const navigate = useNavigate()
  const viewProfile=()=>{
    navigate(`/matrimonySingleUserView/${request.fromUID}`)
  }
 
  return (
    <div>
      <div className="request-item">
        <div className="user-photo">
          <img src="" alt="" />
        </div>
        <div className="user-details">

          <div>
            <p>Name: {requestData.firstName}</p>
            <p>Profession: {requestData.profession}</p>
          </div>
          <div>
            <p>Age: {requestData.age}</p>
            <p>Qualification: {requestData.qualification}</p>
          </div>
          <div>
            <p>Caste: {requestData.caste}</p>
            <p>Religion: {requestData.religion}</p>
          </div>
        </div>
        <div className="actions">
          <button className="accept-btn">Accept</button>
          <button className="danger-btn">Reject</button>
          <button className="view-btn" onClick={viewProfile}>View</button>
        </div>
      </div>
    </div>
  )
}

export default RequestList