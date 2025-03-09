import React, { useState } from "react";
import axios from "axios";

const AudioUploader = ({ onTranscriptGenerated }) => {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return alert("Please select an audio file!");

    setLoading(true);
    const formData = new FormData();
    formData.append("audio", file); 

    try {
      const response = await axios.post("http://localhost:5000/api/audio/transcribe", formData);
      setTranscript(response.data.transcript);
      onTranscriptGenerated(response.data.transcript); //Pass to `Videos.jsx`
    } catch (error) {
      console.error("Error:", error);
      setTranscript("Failed to transcribe audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audio-uploader">
      <h2>Upload Audio</h2>
      <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      {loading ? <p>Transcribing...</p> : <p>{transcript || "No transcript available"}</p>}
    </div>
  );
};

export default AudioUploader;
