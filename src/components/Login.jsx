import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 用于重定向
import "../styles/Login.css"; // ✅ 引入样式

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState(""); // ✅ 登录成功/失败提示信息
    const navigate = useNavigate(); // ✅ 用于跳转页面

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // ✅ 存储 JWT Token
                setMessage("Login successful!");
                navigate("/Dashboard"); // ✅ 登录后跳转到个人主页
            } else {
                setMessage(data.error || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="illustration-container">
                    <img src="/assets/illustration.png" alt="Illustration" className="illustration-img" />
                </div>

                <div className="login-content">
                    <h2>Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <button type="submit" className="login-btn">Log In</button>
                    </form>
                    {message && <p className="login-message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;
