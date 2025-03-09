import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import "../styles/Dictionary.css";
import useOxfordDictionary from "../hooks/useOxfordDictionary"; 

const Dictionary = ({ userId }) => {
  const [words, setWords] = useState([]); // Storing words fetched by the API
  const [selectedWord, setSelectedWord] = useState(null);
  const { definition, translation, loading } = useOxfordDictionary(selectedWord?.word, "en", "zh");

  // Get the user's word via API
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
          {/* Left side: Word list */}
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

          {/* Right side: word details*/}
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

//  Pass userId to get the corresponding user's word
export default function DefaultDictionary() {
  const userId = 1; 
  return <Dictionary userId={userId} />;
}
