import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function SentList({ request }) {
  console.log(request);

  const [requestData, setRequestData] = useState({})
  useEffect(() => {
    const findProfileOfFromUser = async () => {
      const response = await axios.get(`http://localhost:8083/api/matrimony/profile/getProfile/${request.toUID}`)
      setRequestData(response.data)
    }
    findProfileOfFromUser()
  }, [request.fromUID])

  console.log(requestData);


  const navigate = useNavigate()
  const viewProfile = () => {
    navigate(`/matrimonySingleUserView/${request.toUID}`)
  }
  return (
    <div>
      <div className="request-item">
        <div className="user-photo">
          <img src="" alt="" />
        </div>
        <div className="user-details">

          <div>
            <p>Name: {requestData?.firstName}</p>
            <p>Profession: {requestData?.profession}</p>
          </div>
          <div>
            <p>Age: {requestData?.age}</p>
            <p>Qualification: {requestData?.qualification}</p>
          </div>
          <div>
            <p>Caste: {requestData?.caste}</p>
            <p>Religion: {requestData?.religion}</p>
          </div>
        </div>
        <div className="actions">
          <button className="pending-btn">Pending</button>
          <button className="view-btn" onClick={viewProfile}>View</button>
        </div>
      </div>
    </div>
  )
}

export default SentList