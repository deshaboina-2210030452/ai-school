"use client";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function Result() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Quiz Analysis</h2>
        <p>AI has analyzed your performance.</p>

        <button onClick={() => router.push("/dashboard")}>
          View Dashboard
        </button>
      </div>
    </>
  );
}
