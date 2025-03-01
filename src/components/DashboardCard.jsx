import React from "react";
import "../styles/DashboardCard.css";

const DashboardCard = ({ imageUrl }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-content">
        <img src={imageUrl} alt="Card" className="dashboard-card-image" />
      </div>
    </div>
  );
};

export default DashboardCard;

