import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar"; // ✅ 侧边栏
import "../styles/Dictionary.css";

const Dictionary = () => {
  // ✅ 词汇列表
  const words = [
    { word: "Eloquent", definition: "Fluent or persuasive in speaking or writing." },
    { word: "Meticulous", definition: "Showing great attention to detail; very careful." },
    { word: "Resilient", definition: "Able to withstand or recover quickly from difficulties." },
    { word: "Innovative", definition: "Featuring new methods; advanced and original." },
  ];

  // ✅ 选中的单词（默认无选中）
  const [selectedWord, setSelectedWord] = useState(null);

  return (
    <div className="dashboard-container"> {/* ✅ 保留 Dashboard 结构 */}
      <div className="dashboard-background"></div> {/* ✅ 保留 背景层 */}
      <DashboardSidebar /> {/* ✅ 保留 Sidebar */}

      <div className="dictionary-main-content">
        <h2 className="dictionary-title">Favorite Words</h2>

        {/* ✅ 新增 `dictionary-content` 让单词列表和释义左右排列 */}
        <div className="dictionary-content">
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

export default Dictionary;
