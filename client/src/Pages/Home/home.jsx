import React from "react";
import "./assets/css/animate.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/slick.css";
import "./assets/icons/style.css";
import "./assets/css/style.css";
import "./assets/css/swiper-bundle.min.css";
import avatar1 from "./assets/images/avatar/curly-hair-man.png";
import avatar2 from "./assets/images/avatar/long-hair-woman.png";
import avatar3 from "./assets/images/avatar/chat.png";
import avatar4 from "./assets/images/avatar/dreadlocked-man.png";
import avatar5 from "./assets/images/avatar/bald-hair-man-with-vr.png";
import { Link } from "react-router-dom";
import Navbar from "../../Component/Navbar/Navbar";

const home = () => {
  return (
    <div className="homepage">
      <Navbar/>
      <div id="content">
        <div className="slider-block style-two">
          <div className="slider-main">
            <div className="container flex-center h-100">
              <div className="row flex-center w-100">
                <div className="col-lg-9 text-center">
                  <div className="heading2 text-center text-scroll-bottom-to-top1">
                    Connect,{" "}
                    <span className="text-scroll-bottom-to-top2">Chat, </span>
                    <span className="text-scroll-bottom-to-top3">Share</span>
                    <span className="text-scroll-bottom-to-top4">
                      {" "}
                      Moments{" "}
                    </span>
                    <span className="text-scroll-bottom-to-top5"> & </span>
                    <span className="text-scroll-bottom-to-top6">
                      {" "}
                      Memories:{" "}
                    </span>
                    <span className="text-scroll-bottom-to-top7">
                      Revolutionize{" "}
                    </span>
                    <span className="text-scroll-bottom-to-top8">Your </span>
                    <span className="text-scroll-bottom-to-top9">
                      Conversations
                    </span>
                  </div>
                </div>
                <div className="col-lg-8 text-center">
                  <div className="body2 text-placehover mt-24">
                    Your Ultimate Chat Experience Awaits!
                  </div>
                </div>
                {/* <div className="col-xxl-7 col-lg-8 col-11 block-input mt-40">
                <input className="body2" type="text" placeholder="Search"/>
                <div className="block-button scroll-left-to-right3"><a className="button button-green-hover" href="#!"> <span>   <span> </span></span><span className="bg-green">Find now</span></a></div>
              </div> */}
                <div className="col-lg-8 col-md-12 tags flex-center gap-32 mt-24">
                  <div className="text-subtitle display-inline-block">
                  <div className="block-button scroll-left-to-right3">
                  <a className="button button-green-hover">
                    <span>
                      <span> </span>
                    </span>
                    <span className="bg-green"><Link to='/auth'>Get Started</Link></span>
                  </a>
                </div>

                  </div>
                </div>
              </div>
              <div className="list-avatar">
                {" "}
                <img src={avatar1} alt="" />
                <img src={avatar3} alt="" />
                <img src={avatar2} alt="" />
                <img src={avatar4} alt="" />
                <img src={avatar5} alt="" />
                <img src="assets/images/slider/84x84.png" alt="" />
              </div>
            </div>
          </div>
        </div>

        
        <div className="style-two">
          <a className="scroll-to-top-btn" href="#header">
            <i className="ph-bold ph-caret-up"></i>
          </a>
        </div>
      </div>
      
        </div>
  );
};

export default home;

{
  /* <script src="./assets/js/jquery-3.7.0.js"></script>
    <script src="./assets/js/jquery-migrate-3.4.1.js"></script>
    <script src="./assets/js/slick.min.js"></script>
    <script src="./assets/js/scrollreveal.js"></script>
    <script src="./assets/js/swiper-bundle.min.js"></script>
    <script src="./assets/js/bootstrap.bundle.min.js"></script>
    <script src="./assets/js/countUp.min.js"></script>
    <script src="./assets/js/waypoints.min.js"></script>
    <script src="./assets/js/phosphor-icons.js"></script>
    <script src="./assets/js/main.min.js"></script> */
}
