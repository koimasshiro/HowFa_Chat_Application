import React, { useEffect, useRef, useState } from "react";
import "./ChatContent.css";
import "../tailwindcolorscss/tailwindColors.css";
import ConversationBox from "../ConversationBox/ConversationBox";
import { useSelector } from "react-redux";
import { userChats, createChat } from "../../api/ChatRequest";
import ChatList from "../ChatList/ChatList";
import { io } from "socket.io-client";

import AllUsers from "../DisplayAllUsers/AllUsers";

const ChatContent = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const [chats, setChats] = useState([]);
  const [currChat, setCurrChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  // const [chatMessages, setChatMessages] = useState([]);


  const socket = useRef();

  //Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //Receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log(chats)

      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // Function to handle setting current chat
  // const handleChatClick = (chat) => {
  //   setCurrChat(chat);
  // };


  // Function to handle setting current chat or creating a new chat
  const handleChatClick = async (clickedUserId) => {
    // Check if a chat already exists with the clicked user
    const existingChat = chats.find(chat =>
      chat.members.includes(clickedUserId._id) && chat.members.includes(user._id)
    );
      console.log(clickedUserId._id)
    if (existingChat) {
      // Set existing chat as the current chat
      setCurrChat(existingChat);
    } else {
      // Create a new chat with the clicked user
      try {
        const newChatData = await createChat(user._id, clickedUserId._id);
        setCurrChat(newChatData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ width: "100vw" }}>
      <div className="chat-content">
        <div className="content-sidebar">
          <>
            <div className="content-sidebar-title">Chats</div>
            <div className="content-messages">
              <ul className="content-messages-list">
                <li className="content-message-title">
                  <span>Recent</span>
                </li>
                {chats.map((chat) => (
                  <div key={chat._id} onClick={() => setCurrChat(chat)}>
                    <ChatList
                      data={chat}
                      currUserId={user._id}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))}
              </ul>
              {/* Pass handleChatClick as prop to AllUsers */}
              <AllUsers
                currUserId={user._id}
                // online={checkOnlineStatus(chat)}
                handleChatClick={handleChatClick} // Pass the callback function
              />
            </div>
          </>

          {/* <ChatLoading /> */}
        </div>
        <ConversationBox
          chat={currChat}
          currUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default ChatContent;
