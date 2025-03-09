import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 导入 useNavigate
import "../styles/Register.css"; 

function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login"); 
                }, 3000);
            } else {
                setMessage(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="illustration-container">
                    <img src="/assets/illustration.png" alt="Illustration" className="illustration-img" />
                </div>

                <div className="register-content">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                        <button type="submit" className="register-btn">Sign Up</button>
                    </form>
                    {message && <p className="register-message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Register;



