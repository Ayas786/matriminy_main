import React from 'react'
import propic from '../../../../assets/profile/OIP.jpg'
function Conversation() {
  return (
    <div className='conversation'>
        <img src={propic} className='conversationImage' alt="" />
        <span className='conversationName'>akash</span>
    </div>
  )
}

export default Conversation