"use client";
import { useState } from "react";
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
      <div style={{ padding: 20 }}>
        <h2>EduMate AI</h2>


        

        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    </>
  );
}
