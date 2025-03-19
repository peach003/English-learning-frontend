import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import "../styles/Dictionary.css";
import useOxfordDictionary from "../hooks/useOxfordDictionary";

const Dictionary = ({ userId }) => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const { definition, translation, loading } = useOxfordDictionary(selectedWord?.word, "en", "zh");
  
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 10; 

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/wordbook/user/${userId}/words`);
        console.log("API Response:", response.data);
        setWords(response.data);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };
    fetchWords();
  }, [userId]);

  // Calculate pagination content
  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);
  const totalPages = Math.ceil(words.length / wordsPerPage);

  return (
    <div className="dashboard-container">
      <div className="dashboard-background"></div>
      <DashboardSidebar />

      <div className="dictionary-main-content">
        <div className="dictionary-header">
          <h2 className="dictionary-title">My Dictionary</h2>
        </div>

        <div className="dictionary-layout">
          {/* Left side: Word list*/}
          <div className="dictionary-word-list">
            <div className="dictionary-word-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {currentWords.length > 0 ? (
                currentWords.map((item, index) => (
                  <button
                    key={index}
                    className={`dictionary-word-button ${selectedWord?.word === item.word ? "selected" : ""}`}
                    onClick={() => setSelectedWord(item)}
                  >
                    {item.word}
                  </button>
                ))
              ) : (
                <p>No words found.</p>
              )}
            </div>
            {/* Pagination button*/}
            <div className="dictionary-pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/*Right side: Word details*/}
          <div className="dictionary-meaning-section">
            <div className="dictionary-meaning-content">
              {selectedWord ? (
                <div className="selected-word-details">
                  <h3>{selectedWord.word}</h3>

                  <div className="definition-section">
                    <h4>Definition</h4>
                    {loading ? <p className="loading">Loading...</p> : <p>{definition || "No definition available"}</p>}
                  </div>

                  <div className="translation-section">
                    <h4>Translation (Chinese)</h4>
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

export default function DefaultDictionary() {
  const userId = 1;
  return <Dictionary userId={userId} />;
}