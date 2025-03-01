import React from "react";
import "../styles/DashboardUserInfo.css"; // ✅ 确保正确引入样式

const DashboardUserInfo = () => {
  return (
    <div className="dashboard-user-info">
      {/* ✅ 显示头像 */}
      <img src="/assets/avatar.png" alt="User Avatar" className="user-avatar" />

      {/* ✅ 直接显示欢迎语 */}
      
      <h3 className="user-welcome">A hard work, a harvest.</h3>
    </div>
  );
};

export default DashboardUserInfo;



