import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardLearningSection.css";

const DashboardLearningSection = () => {
  return (
    <div className="dashboard-learning-section">
      <h2 className="section-title">Learn and Live</h2>
      <div className="card-container">
        {/* Make Link wrap images only */}
        <Link to="/videos" className="dashboard-card">
          <img src="/assets/card.png" alt="Videos" />
        </Link>

        {/*  Dictionary card */}
        <Link to="/dictionary" className="dashboard-card">
          <img src="/assets/card1.png" alt="Dictionary" />
        </Link> 

        {/*  Review Plan card */}
          <Link to="/review" className="dashboard-card">
          <img src="/assets/card2.png" alt="Review Plan" />
        </Link>
      </div>
      <h2 className="section-title">Statistics</h2>
    </div>
  );
};

export default DashboardLearningSection;


