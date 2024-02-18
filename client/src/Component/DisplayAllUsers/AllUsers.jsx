import React,{ useEffect, useState } from "react";
import "../ChatList/ChatList.css";
import '../tailwindcolorscss/tailwindColors.css'
import { getAllUsers } from "../../api/UserRequest";

const AllUsers = ({ currUserId, online, handleChatClick }) => {
    const [users, setUsers] = useState([]);
  
    // useEffect(() => {
    //   const fetchUsers = async () => {
    //     try {
    //       const { data } = await getAllUsers();
    //       setUsers(data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   fetchUsers();
    // }, []);

    // console.log(users)

    useEffect(() => {
      const fetchUsers = async () => {
          try {
              const { data } = await getAllUsers();
              // Filter out the currently logged-in user
              const filteredUsers = data.filter(user => user._id !== currUserId);
              setUsers(filteredUsers);
          } catch (error) {
              console.log(error);
          }
      };
      fetchUsers();
  }, [currUserId]);


    return (
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <li onClick={() => handleChatClick(user)}>
              <a className="message">
                <img className="content-message-image" src={user.image} alt={user.name} />
                {online && <span className="content-message-online"></span>}
                <span className="content-message-info">
                  <span className="content-message-name">{user.name}</span>
                  {/* <span className="content-message-text">
                    Lorem ipsum dolor sit amet consectetur.
                  </span> */}
                </span>
                <span className="content-message-more">
                  {/* <span className="content-message-unread">5</span> */}
                  <span className="content-message-time" >12:30</span>
                </span>
              </a>
            </li>
          </div>
        ))}
      </div>
    );
  };
export default AllUsers