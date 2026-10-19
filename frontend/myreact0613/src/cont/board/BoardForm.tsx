import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

interface Result {
  input: string;
  positive_prob: number;
  negative_prob: number;
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    background: "#f5f7fb",
  },

  card: {
    width: "600px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center" as const,
    marginBottom: "25px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },

  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    height: "140px",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  saveBtn: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  aiBtn: {
    background: "#2196F3",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#999",
    color: "white",
    padding: "10px 18px",
    borderRadius: "6px",
    textDecoration: "none",
  },

  resultBox: {
    marginTop: "30px",
    padding: "20px",
    background: "#f1f5ff",
    borderRadius: "10px",
  },

  resultScore: {
    display: "flex",
    gap: "20px",
    marginTop: "10px",
  },

  positive: {
    color: "green",
    fontWeight: "bold",
  },

  negative: {
    color: "red",
    fontWeight: "bold",
  },
};

const BoardForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const navigate = useNavigate();

  const contentSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://192.168.0.77:9000/cnn1d/myBoardNlp", {
        content: content,
      });

      setResult(res.data);
      console.log("AI 분석 결과:", res.data);
    } catch (err) {
      alert("AI 분석 실패");
    }
  };

  const boardSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBoard = {
      id: Date.now(),
      title,
      writer,
      content,
    };

    const boardList = localStorage.getItem("boardList");
    const list = boardList ? JSON.parse(boardList) : [];

    list.push(newBoard);

    localStorage.setItem("boardList", JSON.stringify(list));

    alert("글이 저장되었습니다.");
    navigate("/board");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>게시글 작성</h2>

        <form onSubmit={boardSubmit}>
          <div style={styles.formGroup}>
            <label>제목</label>
            <input
              style={styles.input}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label>작성자</label>
            <input
              style={styles.input}
              type="text"
              onChange={(e) => setWriter(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label>내용</label>
            <textarea
              style={styles.textarea}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveBtn}>
              등록하기
            </button>

            <button onClick={contentSubmit} style={styles.aiBtn}>
              AI 감정 분석
            </button>

            <Link to="/board" style={styles.cancelBtn}>
              취소
            </Link>
          </div>
        </form>

        {result && (
          <div style={styles.resultBox}>
            <h3>AI 감정 분석 결과</h3>

            <p>
              <strong>문장 :</strong> {result.input}
            </p>

            <div style={styles.resultScore}>
              <span style={styles.positive}> 긍정 {result.positive_prob}%</span>

              <span style={styles.negative}> 부정 {result.negative_prob}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardForm;