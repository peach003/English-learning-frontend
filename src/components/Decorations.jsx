import React from 'react';
import '../styles/Decorations.css';

function Decorations() {
  return (
    
    <div className="visual-elements">
        <div className="top-decoration">
        <img src="/assets/top-decor.png" alt="Sports equipment" className="top-decor-img" />
      </div>
     
      <div className="dots-pattern">
        <img src="/assets/dots-pattern.png" alt="Purple dots pattern" className="dots-img" />
      </div>

      
      <div className="paper-container">
        <img src="/assets/paper.png" alt="Paper with learning interface" className="paper-img" />
      </div>

      
      <div className="laptop-container">
        <img src="/assets/laptop.png" alt="Laptop with learning apps" className="laptop-img" />
      </div>
    </div>
  );
}

export default Decorations;



