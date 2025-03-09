import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useNavigate } from "react-router-dom";
import "../styles/Review.css"; 

const categories = [
  { id: "3-days", image: "/assets/1.png", name: "New Words" }, 
  { id: "7-days", image: "/assets/2.png", name: "Beginner Review" },
  { id: "14-days", image: "/assets/3.png", name: "Intermediate Review" },
  { id: "28-days", image: "/assets/1.png", name: "Advanced Review" }, 
  { id: "recommended", image: "/assets/2.png", name: "Recommended Words" },
];

const Review = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-background"></div>
      <DashboardSidebar />

      <div className="review-main-content">
        {/* Title section */}
        <h2 className="review-title">Pick your notebook</h2>

        {/* Button section */}
        <div className="category-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => navigate(`/review/${category.id}`)}
            >
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;

