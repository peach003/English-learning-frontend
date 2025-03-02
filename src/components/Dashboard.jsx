import React from "react";
import "../styles/Dashboard.css"; 
import DashboardSidebar from "./DashboardSidebar";
import DashboardMainContent from "./DashboardMainContent";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-background"></div>
      <DashboardSidebar /> {/* ✅ 侧边栏内包含 `DashboardUserInfo.jsx` */}
      <DashboardMainContent />
    </div>
  );
};

export default Dashboard;
