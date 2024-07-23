import React, { useEffect, useRef, useState } from 'react';
import Message from './message/Message';
import ChatOnline from './chatOnline/ChatOnline';
import ConnectedAcceptedPeopleList from './conversation/Conversation';
import { Circles } from 'react-loader-spinner';
import axios from 'axios';
import {io} from 'socket.io-client'
function ChatApp({ currentUserProfileId }) {
    const [conversationArray, setConversationArray] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [newMessages, setNewMessages] = useState("")
    const [arrivalMessages, setArrivalMessages] = useState(null)

    const scrollRef = useRef()
    const socket =useRef()

    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessages", data => {
            console.log("Message received:", data);
            setArrivalMessages({
                senderId:data.senderId,
                text: data.text, 
                createdAt:data.createdAt
            });
            
        });
    },[])


    useEffect(() => {
        if (arrivalMessages) {
            console.log("arrivalMessages is confirm", arrivalMessages);
        } else {
            console.log("No new messages");
        }
    
        arrivalMessages && currentChat?.members.includes(arrivalMessages.senderId) && setMessages((prev) => [...prev, arrivalMessages]);
        console.log("message after checking conditions",messages);
        
    }, [arrivalMessages, currentChat]);


    useEffect(()=>{
        socket.current.emit("addUser",currentUserProfileId)
        socket.current.on("getUsers",users=>{
            console.log("users from socket",users);
        })
    },[currentUserProfileId])


    useEffect(() => {
        const getConversationsArray = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/api/matrimony/conversation/getCurrentUserConversation/${currentUserProfileId}`);
                // console.log("getConversationsArray", response.data);
                setConversationArray(response.data);
            } catch (error) {
                console.error('Failed to fetch conversations:', error);
            }
        };

        if (currentUserProfileId) {
            getConversationsArray();
        }
    }, [currentUserProfileId]);


    useEffect(() => {
        const getMessages = async () => {
            setLoadingMessages(true);
            try {
                const response = await axios.get(`http://localhost:8083/api/matrimony/messages/${currentChat?._id}`);
                setMessages(response.data)
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            } finally {
                setLoadingMessages(false);
            }
        };

        if (currentChat) {
            getMessages();
        }
    }, [currentChat]);

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentChat) {
            console.error("Current chat is not defined");
            return;
        }
        console.log("currentChat",currentChat);
        const receiverId = currentChat.members.find(member => member !== currentUserProfileId);
        if (!receiverId) {
            console.error("Receiver ID is not found");
            return;
        }
        console.log('Sending message to receiverId:', receiverId);
        console.log('New message from socket:', newMessages);

        //req.body which have to given in my backend
        const message = {
            text: newMessages,
            conversationId: currentChat._id,
        };


        socket.current.emit("sendMessage", {
            senderId: currentUserProfileId,
            receiverId: receiverId,
            text: newMessages,
        });
        console.log("messages after sending",messages);
    
        try {
            console.log("req body for send message", message);
            const response = await axios.post(`http://localhost:8083/api/matrimony/messages/${currentUserProfileId}`, message);
            setMessages([...messages, response.data]);
            console.log('Message sent:', response.data);
            setNewMessages('');
        } catch (error) {
            console.log(error);
        }
    };
    
    

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
        console.log("Messages updated:", messages); 
    },[messages])

    useEffect(() => {
        if (currentChat) {
            console.log("Current chat set:", currentChat); 
        }
    }, [currentChat]);


    return (
        <div className="subHeaderMain2">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder='search for friends' className="chatMenuInput" />
                    {conversationArray ? (
                        conversationArray.map((accept, index) => (
                            <div key={index} onClick={() => setCurrentChat(accept)}>
                                <ConnectedAcceptedPeopleList key={index} accept={accept} userProfileId={currentUserProfileId} />
                            </div>
                        ))
                    ) : (
                        <div className="loader-container">
                            <Circles
                                height="100"
                                width="100"
                                color="black"
                                ariaLabel="circles-loading"
                                visible={true}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                {loadingMessages ? (
                                    <div className="loader-container">
                                        <Circles
                                            height="100"
                                            width="100"
                                            color="black"
                                            ariaLabel="circles-loading"
                                            visible={true}
                                        />
                                    </div>
                                ) : (
                                    messages.map((msg, index) => (
                                        <div key={index} ref={scrollRef}>
                                            <Message key={index} own={msg.sender === currentUserProfileId} message={msg} />
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="ChatBoxBottom">
                                <textarea className='chatMessageInput'
                                    placeholder="write something ...."
                                    onChange={(e) => setNewMessages(e.target.value)}
                                    value={newMessages}>
                                </textarea>
                                <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                            </div>
                        </>
                    ) : (

                        <>
                            <span>Open a conversation to start a chat</span>
                            <div className="ChatBoxBottom">
                                <textarea className='chatMessageInput' placeholder="write something ...."></textarea>
                                <button className='chatSubmitButton'>Send</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
    );
}

export default ChatApp;
