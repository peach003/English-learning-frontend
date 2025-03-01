import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardSidebar.css"; // 确保正确引入 CSS

const DashboardSidebar = () => {
  return (
    <div className="dashboard-sidebar">
      <nav className="dashboard-nav">
        <Link to="/dashboard" className="dashboard-button">Dashboard</Link>
        <Link to="/videos" className="dashboard-button">Videos</Link>
        <Link to="/dictionary" className="dashboard-button">Dictionary</Link>
        <Link to="/schedule" className="dashboard-button">Schedule</Link>
        <Link to="/settings" className="dashboard-button">Settings</Link>
        <Link to="/logout" className="dashboard-button logout-button">Log Out</Link>
      </nav>
      <div className="sidebar-magnifier">
        <img src="/assets/magnifier.png" alt="Magnifier" className="magnifier-img" />
      </div>
    </div>
  );
};

export default DashboardSidebar;

