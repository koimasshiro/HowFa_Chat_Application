import React, { useEffect, useState } from "react";
import "./ChatList.css";
import '../tailwindcolorscss/tailwindColors.css'
import { getUser } from "../../api/UserRequest";

const ChatList = ({ data, currUserId, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currUserId);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
    <div key={userData?._id}>
      <li>
        <a className="message">
          <img className="content-message-image" src={userData?.image} alt={userData?.name} />
          {online && <span className="content-message-online"></span>}
          <span className="content-message-info">
            <span className="content-message-name">{userData?.name}</span>
            <span className="content-message-text">
              Lorem ipsum dolor sit amet consectetur.
            </span>
          </span>
          <span className="content-message-more">
            <span className="content-message-unread">5</span>
            <span className="content-message-time">12:30</span>
          </span>
        </a>
      </li>
    </div>
    </>
  );
};

export default ChatList;
