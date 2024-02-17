import React, { useEffect, useRef, useState } from "react";
import "./ChatContent.css";
import "../tailwindcolorscss/tailwindColors.css";
import ConversationBox from "../ConversationBox/ConversationBox";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import ChatList from "../ChatList/ChatList";
import { io } from "socket.io-client";

const ChatContent = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const [chats, setChats] = useState([]);
  const [currChat, setCurrChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

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
