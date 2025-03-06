import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import useOxfordDictionary from "../hooks/useOxfordDictionary";
import "../styles/Videos.css";

const Videos = () => {
  const audioRef = useRef(null);
  const [file, setFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const { definition, translation, loading, error } = useOxfordDictionary(selectedWord);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setAudioURL(URL.createObjectURL(uploadedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an audio file.");

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await axios.post("http://localhost:5000/api/audio/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("🎯 Deepgram Response:", response.data);

      if (response.data.subtitles && Array.isArray(response.data.subtitles)) {
        setSubtitles(response.data.subtitles);
      } else {
        console.error("❌ 字幕格式错误:", response.data);
      }
    } catch (error) {
      console.error("❌ Error uploading file:", error);
      alert("Failed to process audio.");
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const updateSubtitle = () => {
      const currentTime = audioElement.currentTime;

      const currentSegment = subtitles.find(
        (segment) => segment.start <= currentTime && currentTime <= segment.end
      );

      if (currentSegment) {
        setCurrentSubtitle(currentSegment.text);
      } else {
        setCurrentSubtitle("");
      }
    };

    audioElement.addEventListener("timeupdate", updateSubtitle);

    return () => {
      audioElement.removeEventListener("timeupdate", updateSubtitle);
    };
  }, [subtitles]);

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  return (
    <div className="dashboard-container">
      <DashboardSidebar />

      <div className="videos-container">
        <h2 className="videos-title">Videos Learning</h2>

        <div className="audio-uploader">
          <input type="file" accept="audio/*" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload & Transcribe</button>
        </div>

        <div className="audio-player">
          {audioURL && (
            <audio ref={audioRef} controls>
              <source src={audioURL} type="audio/mp3" />
            </audio>
          )}
        </div>

        <div className="subtitle-container">
          <h3>Subtitles:</h3>
          <p className="subtitle-text">
            {currentSubtitle
              ? currentSubtitle.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="clickable-word"
                    onClick={() => handleWordClick(word)}
                    style={{ marginRight: "5px" }}
                  >
                    {word} 
                  </span>
                ))
              : "No subtitles available"}
          </p>
        </div>

        {selectedWord && (
          <div className="translation-container">
            <h3>Word Translation:</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : (
              <>
                <p><strong>Definition:</strong> {definition}</p>
                <p><strong>Translation:</strong> {translation}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;