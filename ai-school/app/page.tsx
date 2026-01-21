"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const router = useRouter();

  const startQuiz = () => {
    localStorage.setItem("subject", subject);
    localStorage.setItem("level", level);
    router.push("/quiz");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>EduMate AI</h2>

        <input
          placeholder="Enter Subject"
          onChange={(e) => setSubject(e.target.value)}
        /><br /><br />

        <select onChange={(e) => setLevel(e.target.value)}>
          <option>Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select><br /><br />

        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    </>
  );
}
