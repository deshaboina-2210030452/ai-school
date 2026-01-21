import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: "#222", color: "#fff" }}>
      <Link href="/">Home</Link>{" | "}
      <Link href="/quiz">Quiz</Link>{" | "}
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}
