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

// ✅ 注册 Chart.js 组件
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardStatisticsSection = () => {
  // ✅ 折线图数据
 
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Learning Progress",
        data: [2, 4, 6, 8, 10, 14, 18, 20, 25, 30, 35, 40],
        borderColor: "#6366f1", // ✅ 线条颜色
        backgroundColor: "rgba(99, 102, 241, 0.2)", // ✅ 填充颜色
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#6366f1",
        tension: 0.3, // ✅ 让折线更平滑
      },
    ],
  };

  // ✅ 折线图配置选项
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // ✅ 隐藏图例
      },
      tooltip: {
        enabled: true, // ✅ 显示悬停提示
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // ✅ 隐藏 x 轴网格线
        },
      },
      y: {
        grid: {
          color: "#ddd", // ✅ 设置 y 轴网格线颜色
        },
        beginAtZero: true, // ✅ 从 0 开始
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


