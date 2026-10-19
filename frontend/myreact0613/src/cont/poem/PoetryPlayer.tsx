import React, { useState, useRef } from "react";

const PoetryPlayer: React.FC = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 시 내용과 타임라인 (초 단위)
  const poem = [
    { time: 0, text: "뜨거운 햇살 아래" },
    { time: 3, text: "책장은 바람처럼 넘겨지고," },
    { time: 7, text: "땀방울은 작은 별빛 되어" },
    { time: 11, text: "내 마음을 반짝인다." },
    { time: 15, text: "오늘의 노력이" },
    { time: 18, text: "내일의 길을 밝히리라." },
    { time: 22, text: "여름은 짧고," },
    { time: 25, text: "배움은 길게 이어진다." },
  ];

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current?.currentTime || 0;
    const lineIndex = poem.findIndex(
      (line, idx) =>
        currentTime >= line.time &&
        (idx === poem.length - 1 || currentTime < poem[idx + 1].time)
    );
    if (lineIndex !== -1 && lineIndex !== currentLine) {
      setCurrentLine(lineIndex);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>🎧 시 낭송 플레이어</h1>

      {/* 오디오 플레이어 */}
      <audio
        ref={audioRef}
        controls
        onTimeUpdate={handleTimeUpdate}
      >
        <source src="/poem.mp3" type="audio/mpeg" />
        브라우저가 오디오 태그를 지원하지 않습니다.
      </audio>

      {/* 시 내용 표시 */}
      <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>시 내용</h2>
        {poem.map((line, idx) => (
          <p
            key={idx}
            style={{
              fontSize: "1.1em",
              fontWeight: idx === currentLine ? "bold" : "normal",
              color: idx === currentLine ? "#d9534f" : "#333",
              transition: "all 0.3s ease"
            }}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PoetryPlayer;
