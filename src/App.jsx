import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Register from "./components/Register";
import "./styles/App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/videos" element={<Dashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

