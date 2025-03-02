import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import "../styles/Videos.css";

const Videos = () => {
    const audioRef = useRef(null);
    const subtitlesRef = useRef(null);
    const [file, setFile] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [subtitles, setSubtitles] = useState(""); // ✅ 存储实时字幕
    const [selectedWord, setSelectedWord] = useState(""); // ✅ 选中的单词
    const [wordDefinition, setWordDefinition] = useState("Click a word to see its meaning.");
    const [wordBook, setWordBook] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false); // ✅ 控制流式识别状态
    let socket = useRef(null);

    // ✅ 监听音频文件变化
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setAudioURL(URL.createObjectURL(uploadedFile)); // ✅ 生成本地音频 URL
        }
    };

    // ✅ 上传音频文件，并建立 WebSocket 连接
    const handleUploadAndStream = async () => {
        if (!file) return alert("Please select an audio file.");

        setIsStreaming(true); // ✅ 设为流式识别状态

        const formData = new FormData();
        formData.append("file", file);

        try {
            // ✅ 1. 上传音频到后端
            const uploadRes = await axios.post("http://localhost:5000/api/speech/upload-and-transcribe", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // ✅ 2. 如果后端返回了字幕，更新字幕状态
            if (uploadRes.data.subtitles) {
                setSubtitles(uploadRes.data.subtitles);
            }

            // ✅ 3. 连接 .NET WebSocket 代理 (Deepgram Streaming)
            socket.current = new WebSocket("ws://localhost:5000/api/speech/stream");

            socket.current.onopen = () => {
                console.log("Connected to .NET WebSocket proxy.");
                if (audioRef.current) {
                    audioRef.current.play(); // ✅ 开始播放音频
                }
            };

            // ✅ 4. 处理 Deepgram 返回的实时字幕
            socket.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const transcript = data.channel?.alternatives[0]?.transcript || "";
                if (transcript) {
                    setSubtitles((prev) => prev + " " + transcript);
                }
            };

            socket.current.onerror = (error) => {
                console.error("WebSocket Error:", error);
            };

            socket.current.onclose = () => {
                console.log("WebSocket closed.");
                setIsStreaming(false); // ✅ 结束流式识别状态
            };
        } catch (error) {
            console.error("Error uploading file or starting streaming:", error);
            alert("Failed to process audio.");
            setIsStreaming(false);
        }
    };

    // ✅ 点击字幕单词，获取释义
    const handleWordClick = async (word) => {
        if (!word) return;
        
        setSelectedWord(word);
        setWordDefinition("Loading...");

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const meaning = response.data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
            setWordDefinition(meaning);
        } catch (error) {
            setWordDefinition("Definition not found.");
            console.error("Error fetching word definition:", error);
        }
    };

    // ✅ 将单词加入单词本
    const addToWordBook = () => {
        if (selectedWord && !wordBook.includes(selectedWord)) {
            setWordBook([...wordBook, selectedWord]);
        }
    };

    // ✅ 让字幕滚动到底部，保持最新字幕可见
    useEffect(() => {
        if (subtitlesRef.current) {
            subtitlesRef.current.scrollTop = subtitlesRef.current.scrollHeight;
        }
    }, [subtitles]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-background"></div>
            <DashboardSidebar />

            <div className="videos-container">
                <h2 className="videos-title">Videos Learning</h2>

                {/* ✅ 选择 & 上传音频 */}
                <div className="audio-uploader">
                    <input type="file" accept="audio/*" onChange={handleFileChange} />
                    <button onClick={handleUploadAndStream} disabled={isStreaming}>
                        {isStreaming ? "Streaming..." : "Upload & Transcribe"}
                    </button>
                </div>

                {/* ✅ 播放音频 */}
                <div className="audio-player">
                    {audioURL && (
                        <audio ref={audioRef} controls>
                            <source src={audioURL} type="audio/mp3" />
                        </audio>
                    )}
                </div>

                {/* ✅ 字幕生成区域 */}
                <div className="subtitle-container" ref={subtitlesRef}>
                    <h3>Subtitles:</h3>
                    <p className="subtitle-text">
                        {subtitles ? (
                            subtitles.split(" ").map((word, index) => (
                                <span key={index} className="word" onClick={() => handleWordClick(word)}>
                                    {word}{" "}
                                </span>
                            ))
                        ) : (
                            "No subtitles available"
                        )}
                    </p>
                </div>

                {/* ✅ 单词释义显示区域 */}
                {selectedWord && (
                    <div className="word-definition-container">
                        <h3>Word: {selectedWord}</h3>
                        <p className="word-definition-text">{wordDefinition}</p>
                        <button onClick={addToWordBook}>Add to Word Book</button>
                    </div>
                )}

                {/* ✅ 个人单词本 */}
                {wordBook.length > 0 && (
                    <div className="word-book">
                        <h3>My Word Book</h3>
                        <ul>
                            {wordBook.map((word, index) => (
                                <li key={index}>{word}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Videos;



