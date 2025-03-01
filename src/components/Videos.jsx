import React from "react";
import "../styles/Videos.css";

const Videos = () => {
  const subtitle = "This is an example subtitle."; // ✅ 直接用 const 变量
  const wordDefinition = "Word definition will appear here."; // ✅ 直接用 const 变量

  return (
    <div className="videos-container">
      <h2 className="videos-title">Videos Learning</h2>

      {/* ✅ 音频播放器 */}
      <div className="audio-player">
        <audio controls>
          <source src="/assets/audio.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* ✅ 字幕生成区域 */}
      <div className="subtitle-container">
        <p className="subtitle-text" aria-live="polite">{subtitle}</p>
      </div>

      {/* ✅ 单词释义显示区域 */}
      <div className="word-definition-container">
        <p className="word-definition-text" aria-live="polite">{wordDefinition}</p>
      </div>
    </div>
  );
};

export default Videos;


