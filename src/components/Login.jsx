import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Login.css"; 

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate(); 

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
                localStorage.setItem("token", data.token); 

                setMessage("Login successful!");
                navigate("/Dashboard"); 
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
