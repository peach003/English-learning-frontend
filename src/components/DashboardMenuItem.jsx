import React from "react";

const DashboardMenuItem = ({ icon, text, active }) => {
  return (
    <div className={`dashboard-menu-item ${active ? "active" : ""}`}>
      <div className="dashboard-menu-icon">
        <span className={`icon-${icon}`}></span>
      </div>
      <span className="dashboard-menu-text">{text}</span>
    </div>
  );
};

export default DashboardMenuItem;
