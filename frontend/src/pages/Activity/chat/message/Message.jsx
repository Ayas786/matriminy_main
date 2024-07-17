import React from 'react'
import propic from '../../../../assets/profile/OIP.jpg'
import { formatDistanceToNow } from 'date-fns';
function Message({message,own}) {
  
  return (
    <div className={own ? "message":"message own"}>
        <div className="messageTop">
            <img src={propic} alt="" className='messageImage'/>
           <p className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">{formatDistanceToNow(message.createdAt)} ago</div>
    </div>
  )
}

export default Message