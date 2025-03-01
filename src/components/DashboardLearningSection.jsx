import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardLearningSection.css";

const DashboardLearningSection = () => {
  return (
    <div className="dashboard-learning-section">
      <h2 className="section-title">Learn and Live</h2>
      <div className="card-container">
        {/* ✅ 让 Link 只包裹图片，避免影响卡片布局 */}
        <Link to="/videos" className="dashboard-card">
          <img src="/assets/card.png" alt="Videos" />
        </Link>

        {/* ✅ Dictionary 卡片 */}
        <Link to="/dictionary" className="dashboard-card">
          <img src="/assets/card1.png" alt="Dictionary" />
        </Link> 

        {/* ✅ Review Plan 卡片 */}
          <Link to="/review" className="dashboard-card">
          <img src="/assets/card2.png" alt="Review Plan" />
        </Link>
      </div>
      <h2 className="section-title">Statistics</h2>
    </div>
  );
};

export default DashboardLearningSection;


