import React from 'react'
import propic from '../../../../assets/profile/OIP.jpg'

function Message({own}) {
  return (
    <div className={own ? "message own":"message"}>
        <div className="messageTop">
            <img src={propic} alt="" className='messageImage'/>
           <p className='messageText'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quod impedit</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message