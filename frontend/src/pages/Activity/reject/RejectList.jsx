import React from 'react'

function RejectList() {
  return (
    <div>
          <div className="request-item">
                  <div className="user-photo">
                    <img src="" alt="" />
                  </div>
                    <div className="user-details">
                   
                     <div>
                        <p>Name: Ayas</p>
                        <p>Profession: BTech</p>
                     </div>
                      <div>
                        <p>Age: 21</p>
                        <p>Qualification: IT</p>
                      </div>
                     <div>
                        <p>Caste: Sunni</p>
                        <p>Religion: Muslim</p>
                     </div>
                    </div>
                    <div className="actions">
                      <button className="danger-btn">Reject</button>
                    </div>
                  </div>
    </div>
  )
}

export default RejectList