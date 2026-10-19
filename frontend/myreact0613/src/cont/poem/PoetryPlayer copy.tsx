import React, { useState } from "react";

const PoetryPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>🎧 시 낭송 플레이어</h1>
      
      {/* 오디오 플레이어 */}
      <audio controls onPlay={handlePlay} onPause={handlePause}>
        <source src="/poem.mp3" type="audio/mpeg" />
        브라우저가 오디오 태그를 지원하지 않습니다.
      </audio>

      {/* 시 내용 표시 */}
      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>시 내용</h2>
        <p>뜨거운 햇살 아래</p>
        <p>책장은 바람처럼 넘겨지고,</p>
        <p>땀방울은 작은 별빛 되어</p>
        <p>내 마음을 반짝인다.</p>

        <p>오늘의 노력이</p>
        <p>내일의 길을 밝히리라.</p>
        <p>여름은 짧고,</p>
        <p>배움은 길게 이어진다.</p>
      </div>

      {/* 상태 표시 */}
      <p style={{ marginTop: "10px", fontStyle: "italic" }}>
        {isPlaying ? "낭송이 재생 중입니다..." : "재생을 시작하세요."}
      </p>
    </div>
  );
};

export default PoetryPlayer;
