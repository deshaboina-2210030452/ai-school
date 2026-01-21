"use client";
import { useState } from "react";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const optionLetters = ["A", "B", "C", "D"];

  async function generateQuiz() {
    setLoading(true);
    setQuestions([]);
    setAnswers({});
    setScore(null);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, level }),
      });

      const data = await res.json();
      setQuestions(Array.isArray(data.questions) ? data.questions : []);
    } catch (err) {
      console.error(err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }

  // Store selected letter
  function selectAnswer(questionIndex, optionLetter) {
    setAnswers({ ...answers, [questionIndex]: optionLetter });
  }

  // Compare answers by A/B/C/D
  function submitQuiz() {
    let total = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) total++;
    });

    setScore(total);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">AI-Powered Quiz</h1>

      <input
        placeholder="Enter Subject"
        className="border p-2 rounded w-full mb-4"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <select
        className="border p-2 rounded w-full mb-4"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="">Select Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <button
        onClick={generateQuiz}
        disabled={loading || !subject || !level}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center">
            <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            Generating...
          </span>
        ) : (
          "Generate Quiz"
        )}
      </button>

      {questions.map((q, i) => (
        <div key={i} className="mt-6">
          <p className="font-semibold">
            {i + 1}. {q.question}
          </p>

          {q.options.map((opt, idx) => (
            <label key={idx} className="block cursor-pointer mt-2">
              <input
                type="radio"
                name={`question-${i}`}
                checked={answers[i] === optionLetters[idx]}
                onChange={() => selectAnswer(i, optionLetters[idx])}
                className="mr-2"
              />
              {opt} {/* show actual answer text */}
            </label>
          ))}
        </div>
      ))}

      {questions.length > 0 && !loading && (
        <button
          onClick={submitQuiz}
          className="bg-green-500 text-white px-4 py-2 rounded mt-6"
        >
          Submit Quiz
        </button>
      )}

      {score !== null && (
        <h2 className="mt-4 text-xl font-bold text-center">
          Your Score: {score} / {questions.length}
        </h2>
      )}
    </div>
  );
}
