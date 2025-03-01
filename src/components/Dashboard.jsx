import React from "react";
import "../styles/Dashboard.css"; // 确保路径正确
import DashboardSidebar from "./DashboardSidebar";
import DashboardMainContent from "./DashboardMainContent";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-background"></div>
      <DashboardSidebar />
      <DashboardMainContent />
    </div>
  );
};

export default Dashboard;
