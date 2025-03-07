import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import "../styles/ReviewPage.css";
import useOxfordDictionary from "../hooks/useOxfordDictionary";

const ReviewPage = () => {
  const { category } = useParams();
  const validCategory = category || "3-days"; // ✅ 防止 category 为空

  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!validCategory) return; // 防止 undefined 报错

    const categoryMapping = {
      "3-days": "3Days",
      "7-days": "7Days",
      "14-days": "14Days",
      "28-days": "28Days",
    };

    console.log("🟢 Final Category Used:", validCategory);
    console.log("🔵 Checking for category:", categoryMapping[validCategory]);

    setLoading(true);
    setError("");

    fetch(`http://localhost:5000/api/reviewplan/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        console.log("🟢 Full API Response:", JSON.stringify(data, null, 2));

        if (categoryMapping[validCategory] in data) {
          console.log("🟢 Filtered Words Found:", data[categoryMapping[validCategory]]);
          setWords([...data[categoryMapping[validCategory]]]); // ✅ 确保 React 识别数组变化
        } else {
          console.warn("🔴 Category Not Found in API Response:", categoryMapping[validCategory]);
          setWords([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("🔴 Error fetching words:", error);
        setError("Failed to fetch words.");
        setLoading(false);
      });
  }, [validCategory]); // ✅ 监听 validCategory 变化

  const { definition, translation, loading: dictLoading } = useOxfordDictionary(
    selectedWord?.word,
    "en",
    "zh"
  );

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
  
      <div className="dictionary-main-content">
        {/* ✅ 标题独占一行 */}
        <h2 className="review-category-title">
          {validCategory === "3-days" && "Words Within 3 Days"}
          {validCategory === "7-days" && "Words Within 7 Days"}
          {validCategory === "14-days" && "Words Within 14 Days"}
          {validCategory === "28-days" && "Words Within 28 Days"}
        </h2>
  
        {/* ✅ 让单词列表和释义框左右排列 */}
        <div className="dictionary-layout">
          
          {/* ✅ 左侧 - 单词列表 */}
          <div className="word-list-section">
            {loading ? (
              <p>Loading words...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : words.length > 0 ? (
              <table className="word-list-table">
                <tbody>
                  {words.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <button
                          className={`word-button ${
                            selectedWord?.word === item.word ? "selected" : ""
                          }`}
                          onClick={() => setSelectedWord(item)}
                        >
                          {item.word}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No words in this category.</p>
            )}
          </div>
  
          {/* ✅ 右侧 - 释义框 */}
          <div className="word-meaning-section">
            
            <div className="word-meaning-content">
              {selectedWord ? (
                <div className="selected-word-details">
                  <h3>{selectedWord.word}</h3>
  
                  <div className="definition-section">
                    <h4>Definition</h4>
                    {dictLoading ? (
                      <p className="loading">Loading...</p>
                    ) : (
                      <p>{definition || "No definition available"}</p>
                    )}
                  </div>
  
                  <div className="translation-section">
                    <h4>Translation (中文)</h4>
                    {dictLoading ? (
                      <p className="loading">Translating...</p>
                    ) : (
                      <p>{translation || "No translation available"}</p>
                    )}
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
  
}
export default ReviewPage;
