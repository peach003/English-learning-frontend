import React from "react";
import "../styles/Dashboard.css"; 
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
