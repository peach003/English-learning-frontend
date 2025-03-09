import React from "react";
import DashboardLearningSection from "./DashboardLearningSection"; 
import DashboardStatisticsSection from "./DashboardStatisticsSection";
import DashboardUserInfo from "./DashboardUserInfo"; 
import "../styles/DashboardMainContent.css";

const DashboardMainContent = () => {
  return (
    <div className="dashboard-main-content">
      <div className="dashboard-top-section">
        <div className="dashboard-cards-userinfo">
          <DashboardLearningSection /> {/*  Cards are on the left.*/}
          <DashboardUserInfo /> {/*  User Info are on the right.*/}
        </div>
      </div>
      <DashboardStatisticsSection />
    </div>
  );
};

export default DashboardMainContent;


