import React, { useState } from "react";
import "../styles/Register.css"; // ✅ 引入样式

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registration Data:", formData);
  };

  return (
    <div className="register-page">
      {/* ✅ 注册表单区域 */}
      <div className="register-container">
        {/* ✅ Illustration 图片现在在注册框内 */}
        <div className="illustration-container">
          <img src="/assets/illustration.png" alt="Illustration" className="illustration-img" />
        </div>

        <div className="register-content">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            <button type="submit" className="register-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;


