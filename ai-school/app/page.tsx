"use client";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Home() {
  const router = useRouter();

  const startQuiz = () => {
    router.push("/quiz");
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "40px 20px",
          maxWidth: "900px",
          margin: "auto",
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", color: "#3b87d3" }}>
          Welcome to Quiz.ai Where You Can Test Your Skills!
        </h1>

        <p style={{ fontSize: "1.25rem", color: "#256bb1", marginBottom: "30px" }}>
          Unlock your potential and upskill yourself with our AI-powered quizzes. 
          Test your knowledge, learn new skills, and become the best version of yourself.
        </p>

        <button
          onClick={startQuiz}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
        >
          Start Quiz
        </button>

        <div style={{ marginTop: "50px", color: "#7f8c8d", fontSize: "1rem" }}>
          <p>Join hundreds of learners who are enhancing their skills every day!</p>
        </div>
      </div>
    </>
  );
}
