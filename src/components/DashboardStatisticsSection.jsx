import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/DashboardStatisticsSection.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering Chart.js Components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardStatisticsSection = () => {
  
 
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Learning Progress",
        data: [2, 4, 6, 8, 10, 14, 18, 20, 25, 30, 35, 40],
        borderColor: "#6366f1", 
        backgroundColor: "rgba(99, 102, 241, 0.2)", 
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#6366f1",
        tension: 0.3, // 
      },
    ],
  };

  // Line Chart Configuration Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true, 
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        grid: {
          color: "#ddd", 
        },
        beginAtZero: true, 
      },
    },
  };

  return (
    <div className="dashboard-statistics">
      
      <h2 className="statistics-title">Learning Progress</h2>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardStatisticsSection;


