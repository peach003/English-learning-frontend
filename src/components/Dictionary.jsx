import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import "../styles/Dictionary.css";
import useOxfordDictionary from "../hooks/useOxfordDictionary"; // 统一的 Hook

const Dictionary = ({ words }) => {
  const [selectedWord, setSelectedWord] = useState(null);

  // 使用 Oxford API 获取单词定义和翻译
  const { definition, translation, loading } = useOxfordDictionary(selectedWord?.word, "en", "zh");

  return (
    <div className="dashboard-container">
      <div className="dashboard-background"></div>
      <DashboardSidebar />

      <div className="dictionary-main-content">
        {/* 🔹 标题部分，使其在一行 */}
        <div className="dictionary-header">
          <h2 className="dictionary-title">My Dictionary</h2>
          <h2 className="details-title">Details</h2>
        </div>

        {/* 🔹 主要内容区域：左侧单词列表 + 右侧释义框 */}
        <div className="dictionary-layout">
          {/* 左侧：单词列表 */}
          <div className="word-list-section">
            <table className="word-list-table">
              <tbody>
                {words.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className={`word-button ${selectedWord?.word === item.word ? "selected" : ""}`}
                        onClick={() => setSelectedWord(item)}
                      >
                        {item.word}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 右侧：单词详情 */}
          <div className="word-meaning-section">
            <div className="word-meaning-content">
              {selectedWord ? (
                <div className="selected-word-details">
                  <h3>{selectedWord.word}</h3>

                  {/* 定义显示区域 */}
                  <div className="definition-section">
                    <h4>Definition</h4>
                    {loading ? <p className="loading">Loading...</p> : <p>{definition || "No definition available"}</p>}
                  </div>

                  {/* 翻译显示区域 */}
                  <div className="translation-section">
                    <h4>Translation (中文)</h4>
                    {loading ? <p className="loading">Translating...</p> : <p>{translation || "No translation available"}</p>}
                  </div>
                </div>
              ) : (
                <p className="default-message">Select a word to see details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 保持原有单词列表
export default function DefaultDictionary() {
  const words = [
    { word: "Apple" },
    { word: "Addition" },
    { word: "Appear" },
    { word: "Assist" },
  ];

  return <Dictionary words={words} />;
}

