import React, { useEffect, useState, useContext } from "react";
import "../styles/DashboardUserInfo.css"; 
import api from "../api/axiosInstance"; 
import { AuthContext } from "../context/AuthContext";

const DashboardUserInfo = () => {
    const { user } = useContext(AuthContext) || {}; // ✅ 避免 `undefined` 错误
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        console.log("AuthContext user:", user); // ✅ 调试 user 是否正确获取
        
        if (user?.email) {  // ✅ 确保 user 不是空值
            api.get("/auth/profile")
                .then((response) => {
                    console.log("Profile API Response:", response.data); // ✅ 调试 API 返回的用户信息
                    setProfile(response.data);
                })
                .catch((error) => console.error("Error fetching profile:", error));
        }
    }, [user]);

    const displayName = profile?.fullName || user?.fullName || "User"; // ✅ 统一使用 displayName 变量

    return (
        <div className="dashboard-user-info">
            <img 
                src={profile?.avatarUrl || "/assets/avatar.png"} 
                alt="User Avatar" 
                className="user-avatar" 
            />
            <h3 className="user-welcome">
                Welcome, {displayName}! A hard work, a harvest.
            </h3>
        </div>
    );
};

export default DashboardUserInfo;





