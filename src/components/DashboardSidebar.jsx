import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardSidebar.css"; 

const DashboardSidebar = () => {
  return (
    <div className="dashboard-sidebar">
      <nav className="dashboard-nav">
        <Link to="/dashboard" className="dashboard-button">Home</Link>
        <Link to="/videos" className="dashboard-button">Audios</Link>
        <Link to="/dictionary" className="dashboard-button">Dictionary</Link>
        <Link to="/Review" className="dashboard-button">Review</Link>
        
        <Link to="/logout" className="dashboard-button logout-button">Log Out</Link>
      </nav>
      <div className="sidebar-magnifier">
        <img src="/assets/magnifier.png" alt="Magnifier" className="magnifier-img" />
      </div>
    </div>
  );
};

export default DashboardSidebar;

