import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext"; 
import PrivateRoute from "./PrivateRoute"; 
import MainContent from "./MainContent";
import Register from "./Register";
import "../styles/App.css";
import Login from "./Login";
import Dashboard from "./Dashboard"; 
import Videos from "./Videos"; 
import Dictionary from "./Dictionary";
import Review from "./Review";
import ReviewPage from "./ReviewPage"; 

function App() {
  return (
    <AuthProvider> {/* Make AuthContext accessible to all components */}
      <Router>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/review" element={<PrivateRoute><Review /></PrivateRoute>} /> 
          <Route path="/review/:category" element={<PrivateRoute><ReviewPage /></PrivateRoute>} /> 


          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> 
          <Route path="/videos" element={<PrivateRoute><Videos /></PrivateRoute>} />
          <Route path="/dictionary" element={<PrivateRoute><Dictionary /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



