import React from "react";
import "./Contact.css";
import Navbar from "../../Component/Navbar/Navbar";

const Contact = () => {
  return (
    <>      
      <div className="contact">
      <Navbar />
        <div className="container">
          <form className="form-container">
            <div className="headline">
              <span>Contact me</span>
            </div>
            <div className="form-line">
              <input type="text" className="form-input" />
              <label>Name</label>
              <div className="check-label"></div>
            </div>
            <div className="form-line">
              <input type="text" className="form-input" required />
              <label>Your email *</label>
              <div className="error-label">Field is required!</div>
              <div className="check-label"></div>
            </div>
            <div className="form-line">
              <input type="text" className="form-input" />
              <label>Subject</label>
              <div className="check-label"></div>
            </div>
            <div className="form-line">
              <textarea className="form-input" required></textarea>
              <label>Message</label>
              <div className="check-label"></div>
              <div className="error-label">Field is required!</div>
            </div>

            <input type="button" className="form-button" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
