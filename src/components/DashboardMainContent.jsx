import React from "react";
import DashboardLearningSection from "./DashboardLearningSection"; // Cards 部分
import DashboardStatisticsSection from "./DashboardStatisticsSection";
import DashboardUserInfo from "./DashboardUserInfo"; // 用户信息部分
import "../styles/DashboardMainContent.css";

const DashboardMainContent = () => {
  return (
    <div className="dashboard-main-content">
      <div className="dashboard-top-section">
        <div className="dashboard-cards-userinfo">
          <DashboardLearningSection /> {/* ✅ Cards 在左边 */}
          <DashboardUserInfo /> {/* ✅ User Info 在右边 */}
        </div>
      </div>
      <DashboardStatisticsSection />
    </div>
  );
};

export default DashboardMainContent;


