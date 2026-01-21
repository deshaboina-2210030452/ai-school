"use client";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Personalized Dashboard</h2>
        <ul>
          <li>Weak Topics</li>
          <li>AI Explanations</li>
          <li>Study Plan</li>
        </ul>
      </div>
    </>
  );
}
