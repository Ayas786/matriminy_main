import React from 'react'
import Conversation from './conversation/Conversation'
import Message from './message/Message'
import ChatOnline from './chatOnline/ChatOnline'

function ChatApp() {
    return (
        <div className="subHeaderMain2">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                <input type="text" placeholder='search for friends' className="chatMenuInput" />

                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>

                    </div>
                    <div className="ChatBoxBottom">
                        <textarea className='chatMessageInput' placeholder="write something ...." id=""></textarea>
                        <button className='chatSubmitButton'>Send</button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                </div>
            </div>
        </div>
    )
}

export default ChatApp