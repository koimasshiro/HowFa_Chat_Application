import React from 'react';
import './ChatPage.css'
import ChatContent from '../../Component/ChatContent/ChatContent';
import SideBar from '../../Component/SideBar/SideBar';

const ChatPage = () => {
  return (
    <section className="chat-section">
      <div className="chat-container">

        <SideBar />
         <ChatContent />
      </div>
    </section>
  )
}

export default ChatPage