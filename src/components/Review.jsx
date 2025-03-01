import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar"; // ✅ 保留 Sidebar
import "../styles/Review.css";

const Review = () => {
  // ✅ 复习单词列表
  const words = [
    { word: "Perseverance", definition: "Persistence in doing something despite difficulty." },
    { word: "Diligent", definition: "Showing care and effort in one's work or duties." },
    { word: "Adaptability", definition: "Ability to adjust to new conditions." },
    { word: "Consistency", definition: "The quality of achieving a level of performance that does not vary greatly over time." },
  ];

  // ✅ 选中的单词（默认无选中）
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <div className="dashboard-container"> {/* ✅ 保留 Dashboard 结构 */}
      <div className="dashboard-background"></div> {/* ✅ 背景 */}
      <DashboardSidebar /> {/* ✅ Sidebar */}

      <div className="review-main-content">
        <h2 className="review-title">Review Words</h2>

        {/* ✅ 新增 `review-content` 让单词列表和释义左右排列 */}
        <div className="review-content">
          {/* ✅ 左侧 - 单词表 */}
          <div className="word-list">
            {words.map((item, index) => (
              <button key={index} className="word-button" onClick={() => setSelectedWord(item)}>
                {item.word}
              </button>
            ))}
          </div>

          {/* ✅ 右侧 - 选中的单词释义 */}
          <div className="word-definition">
            {selectedWord ? (
              <>
                <h3>{selectedWord.word}</h3>
                <p>{selectedWord.definition}</p>
              </>
            ) : (
              <p className="default-message">Select a word to see the definition.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
