import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import "../styles/ReviewPage.css";
import useOxfordDictionary from "../hooks/useOxfordDictionary";

const ReviewPage = () => {
  const { category } = useParams(); // Get category from URL

  console.log("🟢 Current Category:", category);

  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) return;

    const apiEndpoint =
      category === "recommended"
        ? "http://localhost:5001/recommend?pastWords=apple,banana&numWords=5"
        : "http://localhost:5000/api/reviewplan/1";

    console.log("🟢 API Request:", apiEndpoint);

    setLoading(true);
    setError("");

    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("🟢 API Response:", data);

        if (category === "recommended") {
          // ✅ FIX: Ensure we correctly read "Recommended" instead of "recommended_words"
          if (data.Recommended && Array.isArray(data.Recommended)) {
            setWords(data.Recommended.map((item) => item.word) || []);
          } else {
            console.warn("🔴 No 'Recommended' data found in API response.");
            setWords([]);
          }
        } else if (category in data) {
          setWords(data[category].map((item) => item.word) || []);
        } else {
          console.warn("🔴 Category data not found:", category);
          setWords([]);
        }
      })
      .catch((error) => {
        console.error("🔴 API Fetch Error:", error);
        setError("Failed to fetch words.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  const { definition, translation, loading: dictLoading } = useOxfordDictionary(
    selectedWord,
    "en",
    "zh"
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-background"></div>
      <DashboardSidebar />

      <div className="dictionary-main-content">
        <h2 className="review-category-title">
          {category === "3Days" && "Words Within 3 Days"}
          {category === "7Days" && "Words Within 7 Days"}
          {category === "14Days" && "Words Within 14 Days"}
          {category === "28Days" && "Words Within 28 Days"}
          {category === "recommended" && "Recommended Words"}
        </h2>

        <div className="dictionary-layout">
          {/* Left: Word List */}
          <div className="word-list-section">
            {loading ? (
              <p>Loading words...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : words.length > 0 ? (
              <table className="word-list-table">
                <tbody>
                  {words.map((word, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          className={`word-button ${
                            selectedWord === word ? "selected" : ""
                          }`}
                          onClick={() => setSelectedWord(word)}
                        >
                          {word}
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

          {/* Right: Word Details */}
          <div className="word-meaning-section">
            <div className="word-meaning-content">
              {selectedWord ? (
                <div className="selected-word-details">
                  <h3>{selectedWord}</h3>

                  <div className="definition-section">
                    <h4>Definition</h4>
                    {dictLoading ? (
                      <p className="loading">Loading...</p>
                    ) : (
                      <p>{definition || "No definition available"}</p>
                    )}
                  </div>

                  <div className="translation-section">
                    <h4>Translation (Chinese)</h4>
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
};

export default ReviewPage;
