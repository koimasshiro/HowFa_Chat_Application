import React from "react";
import "./Navbar.css";
import logo from '../../Assets/Howfa_logo.png'
import { Link } from "react-router-dom";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <div id="header">
      <div className="style-two">
        <div className="header-menu style-one bg-black-surface">
          <div className="container">
            <div className="header-main flex-between">
              <div className="menu-main">
                <ul className="flex-item-center">
                  <li className="flex-center">
                    <Link className="text-subtitle" to='/home'>
                      Home
                    </Link>
                  </li>
                  <li className="flex-center">
                    <a className="text-subtitle" href="#!">
                      Services
                    </a>
                  </li>
                  <li className="flex-center">
                    <Link className="text-subtitle" to="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <a className="logo" href="">
                <img src={logo} alt="howfa logo" />
              </a>
              <div className="right-block flex-item-center">
                <div className="list-social flex-item-center gap-12">
                  <a
                    className="item bora-50 w-40 h-40 flex-center"
                    href="https://www.linkedin.com/in/ese-lawrence/"
                    target="_blank"
                  >
                    <FaLinkedinIn
                      style={{ color: "white", fontSize: "20px" }}
                    />
                  </a>
                  <a
                    className="item bora-50 w-40 h-40 flex-center"
                    href="https://twitter.com/codewithkoi"
                    target="_blank"
                  >
                    <FaXTwitter style={{ color: "white", fontSize: "20px" }} />
                  </a>
                  <a
                    className="item bora-50 w-40 h-40 flex-center"
                    href="https://www.instagram.com/codewithkoi/"
                    target="_blank"
                  >
                    <FaInstagram style={{ color: "white", fontSize: "20px" }} />
                  </a>
                  <a
                    className="item  bora-50 w-40 h-40 flex-center"
                    href="https://github.com/koimasshiro"
                    target="_blank"
                  >
                    <FaGithub style={{ color: "white", fontSize: "20px" }} />
                  </a>
                </div>
                <div className="menu-humburger display-none pr-24 pointer">
                  <i className="ph ph-list text-white fs-24"></i>
                </div>
                {/* <a
                  className="button button-blue-hover text-white text-button"
                  href="mailto:ese.imhariagbe@gmail.com"
                >
                  {" "}
                  <span>
                    {" "}
                    <span></span>
                  </span>
                  <span className="email_btn">Send an Email</span>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
