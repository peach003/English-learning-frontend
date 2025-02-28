import React from 'react';
import '../styles/Decorations.css';

function Decorations() {
  return (
    
    <div className="visual-elements">
        <div className="top-decoration">
        <img src="/assets/top-decor.png" alt="Sports equipment" className="top-decor-img" />
      </div>
      {/* 紫色圆点图片 */}
      <div className="dots-pattern">
        <img src="/assets/dots-pattern.png" alt="Purple dots pattern" className="dots-img" />
      </div>

      {/* 纸张（放大） */}
      <div className="paper-container">
        <img src="/assets/paper.png" alt="Paper with learning interface" className="paper-img" />
      </div>

      {/* 笔记本电脑 */}
      <div className="laptop-container">
        <img src="/assets/laptop.png" alt="Laptop with learning apps" className="laptop-img" />
      </div>
    </div>
  );
}

export default Decorations;



