import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardSidebar from "./DashboardSidebar";
import "../styles/ReviewPage.css";
import useOxfordDictionary from "../hooks/useOxfordDictionary";

const ReviewPage = () => {
  const { category } = useParams();
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/review/${category}`)
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error("Error fetching words:", error));
  }, [category]);

  const { definition, translation, loading } = useOxfordDictionary(selectedWord?.word, "en", "zh");

  return (
    <div className="dashboard-container">
      <DashboardSidebar />

      <div className="dictionary-main-content">
        {/* 标题在外部，避免影响 `flex` 布局 */}
       

        <div className="dictionary-layout">
        <h2 className="review-category-title">
          {category === "new" && "New Words"}
          {category === "basic" && "Beginner Review"}
          {category === "intermediate" && "Intermediate Review"}
          {category === "advanced" && "Advanced Review"}
          {category === "recommended" && "Recommended Words"}
        </h2>
          {/* 左侧：单词列表 */}
          <div className="word-list-section">
            <table className="word-list-table">
              <tbody>
                {words.length > 0 ? (
                  words.map((item) => (
                    <tr key={item.id}>
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
                  <p>暂无单词</p>
                )}
              </tbody>
            </table>
          </div>

          {/* 右侧：单词详情 */}
          <div className="word-meaning-section">
            <h2>Details</h2>
            <div className="word-meaning-content">
              {selectedWord ? (
                <div className="selected-word-details">
                  <h3>{selectedWord.word}</h3>

                  {/* 词义区域 */}
                  <div className="definition-section">
                    <h4>Definition</h4>
                    {loading ? <p className="loading">Loading...</p> : <p>{definition || "No definition available"}</p>}
                  </div>

                  {/* 翻译区域 */}
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

export default ReviewPage;
