import React, { useState } from "react";
import "../styles/Login.css"; // ✅ 引入样式

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login Data:", formData);
  };

  return (
    <div className="login-page">
      {/* ✅ 登录表单区域 */}
      <div className="login-container">
        {/* ✅ Illustration 图片现在在登录框内 */}
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
        </div>
      </div>
    </div>
  );
}

export default Login;
