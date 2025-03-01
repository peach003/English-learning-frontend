import React from "react";
import "../styles/MainContent.css";
import Decorations from "./Decorations";
import { Link } from "react-router-dom"; // ✅ 导入 Link
import Header from "./Header";
function MainContent() {
  return (
    <main className="main-content">
      <div className="white-container">
      <Header/>
      
     <div className="content-wrapper">
        {/* 右侧文本内容 */}
     
        <div className="text-content">
          <h1 className="main-heading">Effective English Courses for Kids and Teenagers</h1>
          <p className="subheading">
            With professional teachers, flexible learning schedules and courses for all levels, you will speak confidently in no time.
          </p>

          {/* 让按钮靠右 */}
          <div className="cta-buttons">
            <Link to="/register" className="button-wrapper">
              <button className="get-started-btn">Sign Up</button>
            </Link>
            <Link to="/login" className="button-wrapper">
              <button className="get-started-btn">Log In</button>
            </Link>
            
          </div>
        </div>

        {/* 左侧装饰元素（保持不变） */}
        <Decorations />
      </div>

      {/* 书包放置在白色方框和紫色背景交界处 */}
      <div className="bottom-decoration">
        <img src="/assets/bottom-decor.png" alt="Schoolbag" className="bottom-decor-img" />
      </div>
      </div>
 
    </main>
  );
}

export default MainContent;
