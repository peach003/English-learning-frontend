import React from 'react';
import { Link } from "react-router-dom"; 
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      
      <nav className="nav-menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><Link to="/Dashboard">Videos</Link></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

