import React, { useEffect, useRef, useState } from "react";
import girlWaving from "../../Assets/3d-business-young-woman-sitting-with-a-laptop-and-waving-her-hand.png";
import "./ConversationBox.css";
import "../../Pages/ChatPage/ChatPage.css";
import { getUser } from "../../api/UserRequest";
import { MdAttachment, MdCall, MdMic } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import { addMessage, getMessages } from "../../api/MessageRequest";
import InputEmoji from "react-input-emoji";

const ConversationBox = ({
  chat,
  currUser,
  setSendMessage,
  receiveMessage,
}) => {
  const [userData, setUserData] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  //fetch data for header name for user
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currUser]);

  //fetch messages from database
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    //messages will only fetch if the chat is not null
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currUser,
      message: newMessage,
      chatId: chat._id,
    };

    //send new message to the database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
    //send message to socket server
    const receiverId = chat.members.find((id) => id !== currUser);
    setSendMessage({ ...message, receiverId });
  };

  //scroll to recent messages
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div style={{ width: "100%" }}>
        {/* <div className="conversation conversation-default active">
          <img src={girlWaving} className="wavingImg" />
          <p>Select chat and view conversation!</p>
        </div> */}
        {chat ? (
          <div className="conversation" id="conversation-1">
            <div className="conversation-top">
              <button type="button" className="conversation-back">
                <i className="ri-arrow-left-line"></i>
              </button>
              <div className="conversation-user">
                <img
                  className="conversation-user-image"
                  src={userData?.image}
                  alt=""
                />
                <div>
                  <div className="conversation-user-name">{userData?.name}</div>
                  {/* <div className="conversation-user-status online">online</div> */}
                </div>
              </div>
              <div className="conversation-buttons">
                <button type="button">
                  <MdCall />
                </button>
                <button type="button">
                  <FaVideo />
                </button>
                <button type="button">
                  <HiOutlineInformationCircle />
                </button>
              </div>
            </div>
            <div className="conversation-main">
              <ul className="conversation-wrapper">
                <div className="coversation-divider">
                  <span>Today</span>
                </div>
                {/* {messages.map((message) => { */}
                {/* <div
                      className={
                        message.senderId === currUser ? "message me" : "message"
                      }
                    >
                      <span>{message.message}</span>
                      <span>{message.createdAt}</span>
                    </div> */}
                {messages.map((message) => (
                  <div key={message._id} ref={scroll}>
                    <li
                      className={
                        message.senderId === currUser
                          ? "conversation-item own"
                          : "conversation-item me"
                      }
                    >
                      <div className="conversation-item-side">
                        <img
                          className="conversation-item-image"
                          src={userData?.image}
                          alt=""
                        />
                      </div>
                      <div className="conversation-item-content">
                        <div className="conversation-item-wrapper">
                          <div className="conversation-item-box">
                            <div className="conversation-item-text">
                              <p>{message.message}</p>
                              <div className="conversation-item-time">
                                {message.createdAt}
                              </div>
                            </div>
                            <div className="conversation-item-dropdown">
                              <button
                                type="button"
                                className="conversation-item-dropdown-toggle"
                              >
                                <i className="ri-more-2-line"></i>
                              </button>
                              <ul className="conversation-item-dropdown-list">
                                <li>
                                  <a href="#">
                                    <i className="ri-share-forward-line"></i>
                                    Forward
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="ri-delete-bin-line"></i>
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>

            <div className="conversation-form">
              <div className="conversation-form-group">
                <InputEmoji value={newMessage} onChange={handleChange} />
              </div>
              <button
                type="button"
                onClick={handleSend}
                className="conversation-form-button conversation-form-submit"
              >
                <BiSend />
              </button>
            </div>
          </div>
        ) : (
          <div className="conversation conversation-default active">
            <img src={girlWaving} className="wavingImg" />
            <p>Select chat and view conversation!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ConversationBox;

