import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import "../styles/Dictionary.css";
import useOxfordDictionary from "../hooks/useOxfordDictionary"; // 统一的 Hook

const Dictionary = ({ userId }) => {
  const [words, setWords] = useState([]); // 存储 API 获取的单词
  const [selectedWord, setSelectedWord] = useState(null);
  const { definition, translation, loading } = useOxfordDictionary(selectedWord?.word, "en", "zh");

  // 📌 通过 API 获取用户的单词
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/wordbook/user/${userId}/words`);
        setWords(response.data);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-background"></div>
      <DashboardSidebar />

      <div className="dictionary-main-content">
        <div className="dictionary-header">
          <h2 className="dictionary-title">My Dictionary</h2>
          
        </div>

        <div className="dictionary-layout">
          {/* 左侧：单词列表 */}
          <div className="word-list-section">
            <table className="word-list-table">
              <tbody>
                {words.length > 0 ? (
                  words.map((item, index) => (
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
                  ))
                ) : (
                  <tr><td>No words found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 右侧：单词详情 */}
          <div className="word-meaning-section">
            <div className="word-meaning-content">
              {selectedWord ? (
                <div className="selected-word-details">
                  <h3>{selectedWord.word}</h3>

                  <div className="definition-section">
                    <h4>Definition</h4>
                    {loading ? <p className="loading">Loading...</p> : <p>{definition || "No definition available"}</p>}
                  </div>

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

// ✅ 传递 userId 来获取对应用户的单词
export default function DefaultDictionary() {
  const userId = 1; // 假设的用户 ID，可以从登录信息获取
  return <Dictionary userId={userId} />;
}
