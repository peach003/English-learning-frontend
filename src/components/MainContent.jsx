import React from "react";
import "../styles/MainContent.css";
import Decorations from "./Decorations";
import { Link } from "react-router-dom"; 
import Header from "./Header";
function MainContent() {
  return (
    <main className="main-content">
      <div className="white-container">
      <Header/>
      
     <div className="content-wrapper">
        {/* Right text content*/}
     
        <div className="text-content">
          <h1 className="main-heading">Master English with AI-Powered, Personalized Learning!</h1>
          <p className="subheading">
          Unlock your full potential with our AI-driven English learning platform. Enjoy real-time pronunciation feedback, personalized study plans, and dynamic vocabulary building. Start your journey today and speak English with confidence!
          </p>

          {/* Keep the buttons to the right */}
          <div className="cta-buttons">
            <Link to="/register" className="button-wrapper">
              <button className="get-started-btn">Sign Up</button>
            </Link>
            <Link to="/login" className="button-wrapper">
              <button className="get-started-btn">Log In</button>
            </Link>
            
          </div>
        </div>

        
        <Decorations />
      </div>

     
      <div className="bottom-decoration">
        <img src="/assets/bottom-decor.png" alt="Schoolbag" className="bottom-decor-img" />
      </div>
      </div>
 
    </main>
  );
}

export default MainContent;
