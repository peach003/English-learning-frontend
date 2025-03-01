import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContent from "./MainContent";
import Register from "./Register";
import "../styles/App.css";
import Login from "./Login";
import Dashboard from "./Dashboard"; 
import Videos from "./Videos"; 
import Dictionary from "./Dictionary";
import Review from "./Review";
function App() {
  return (
    <Router>
      

        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/videos" element={<Dashboard />} /> 
          <Route path="/videos" element={<Videos />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/review" element={<Review />} /> 
        </Routes>
      
    </Router>
  );
}

export default App;

