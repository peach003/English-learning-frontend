import React, { useEffect, useState, useContext } from "react";
import "../styles/DashboardUserInfo.css"; 
import api from "../api/axiosInstance"; 
import { AuthContext } from "../context/AuthContext";

const DashboardUserInfo = () => {
    const { user } = useContext(AuthContext) || {}; //  Avoid `undefined` errors
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        console.log("AuthContext user:", user); // Debug whether user is fetched correctly
        
        if (user?.email) {  // Make sure user is not null
            api.get("/auth/profile")
                .then((response) => {
                    console.log("Profile API Response:", response.data); // User information returned by the debug API
                    setProfile(response.data);
                })
                .catch((error) => console.error("Error fetching profile:", error));
        }
    }, [user]);

    const displayName = profile?.fullName || user?.fullName || "User"; // Uniform use of the displayName variable

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





