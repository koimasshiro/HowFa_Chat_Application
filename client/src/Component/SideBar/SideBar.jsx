import React, { useState } from "react";
import logo from '../../Assets/Howfa_logo_dark.png';
import {
  MdGroups,
  MdCall,
  MdOutlineNotifications,
  MdOutlineSettingsSuggest,
} from "react-icons/md";
import { BsChatQuoteFill, BsSearch } from "react-icons/bs";
import { RiChatSmile2Line } from "react-icons/ri";
import { FaRegUser, FaVideo } from "react-icons/fa";
import "./SideBar.css";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Actions/AuthAction";
import axios from "axios";

const SideBar = () => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  // State to manage the dropdown's open/closed state
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`user?search=${keyword}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

  return (
    <div>
      <div className="chat-sidebar">
        <a href=" " className="chat-sidebar-logo">
          {/* <img src={logo} alt="howfa logo"/> */}
          <BsChatQuoteFill/>
        </a>
        <ul className="chat-sidebar-menu">
          <li className="active">
            <a href=" " data-title="Chats">
              <RiChatSmile2Line />
            </a>
          </li>
          <button>
            <a data-title="Search">
              <BsSearch onClick={onOpen} />
            </a>
          </button>
          
          <li>
            <a href=" " data-title="Notifications">
              <MdOutlineNotifications />
            </a>
          </li>
          <li>
            <a href=" " data-title="Groups">
              <MdGroups />
            </a>
          </li>
          <li>
            <a href=" " data-title="Settings">
              <MdOutlineSettingsSuggest />
            </a>
          </li>
          <ul className="chat-sidebar-profile">
            <button
              type="button"
              onClick={toggleDropdown}
              className="chat-sidebar-profile-toggle"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </button>

            {isDropdownOpen && (
              <div className="chat-sidebar-profile-dropdown">
                {/* Dropdown Content Goes Here */}
                <li>
                  <a href="">
                    <FaRegUser /> Profile
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </div>
            )}
            <ul className="chat-sidebar-profile-dropdown"></ul>
          </ul>
        </ul>
      </div>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              {/* <Box d="flex" pb={2}>
              <Input
                placeholder="search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
              // onClick={handleSearch}
              >Search</Button>
            </Box> */}
              <form action="" className="content-sidebar-form">
                <input
                  type="search"
                  className="content-sidebar-input"
                  placeholder="Search..."
                  value={keyword} onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="content-sidebar-submit">
                  <Button onClick={handleSearch}>
                    <BsSearch />
                  </Button>
                </div>

              </form>
              {/* <ChatLoading/> */}
              <ul>
                {searchResults.map((user) => (
                    <li key={user._id}>{user.name}</li>
                ))}
            </ul>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default SideBar;
