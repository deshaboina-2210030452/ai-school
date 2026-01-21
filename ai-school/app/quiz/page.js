"use client";
import { useState } from "react";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  async function generateQuiz() {
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Java",
        level: "Beginner",
      }),
    });

    const data = await res.json();
    setQuestions(data.questions);
    setAnswers({});
    setScore(null);
  }

  // Store selected answer (index)
  function selectAnswer(questionIndex, optionIndex) {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex,
    });
  }

  // Submit quiz and calculate score
  function submitQuiz() {
    let total = 0;

    const answerMap = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
    };

    questions.forEach((q, i) => {
      const correctIndex = answerMap[q.correctAnswer];
      if (answers[i] === correctIndex) {
        total++;
      }
    });

    setScore(total);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>AI-Powered Quiz</h1>

      <button onClick={generateQuiz}>Generate Quiz</button>

      {questions.map((q, i) => (
        <div key={i} style={{ marginTop: "20px" }}>
          <p>
            <b>
              {i + 1}. {q.question}
            </b>
          </p>

          {q.options.map((opt, idx) => (
            <label key={idx} style={{ display: "block", cursor: "pointer" }}>
              <input
                type="radio"
                name={`question-${i}`}
                checked={answers[i] === idx}
                onChange={() => selectAnswer(i, idx)}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}

      {questions.length > 0 && (
        <button onClick={submitQuiz} style={{ marginTop: "20px" }}>
          Submit Quiz
        </button>
      )}

      {score !== null && (
        <h2 style={{ marginTop: "20px" }}>
          Your Score: {score} / {questions.length}
        </h2>
      )}
    </div>
  );
}
