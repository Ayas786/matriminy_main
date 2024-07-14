import React from 'react'
import propic from '../../../../assets/profile/OIP.jpg'

function ChatOnline() {
  return (
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src={propic} alt="profile" className="chatOnlineImg" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">John Doe</span>
        </div>
  )
}

export default ChatOnline