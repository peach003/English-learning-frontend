import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext"; // 添加 AuthProvider
import PrivateRoute from "./PrivateRoute"; // 受保护路由
import MainContent from "./MainContent";
import Register from "./Register";
import "../styles/App.css";
import Login from "./Login";
import Dashboard from "./Dashboard"; 
import Videos from "./Videos"; 
import Dictionary from "./Dictionary";
import Review from "./Review";
import ReviewPage from "./ReviewPage"; // ✅ 修正 import

function App() {
  return (
    <AuthProvider> {/* 让所有组件可以访问 AuthContext */}
      <Router>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:category" element={<ReviewPage />} />  {/* ✅ 修正 */}
          
          {/* 受保护路由 (用户必须登录才能访问) */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> 
          <Route path="/videos" element={<PrivateRoute><Videos /></PrivateRoute>} />
          <Route path="/dictionary" element={<PrivateRoute><Dictionary /></PrivateRoute>} />
          <Route path="/review" element={<PrivateRoute><Review /></PrivateRoute>} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

