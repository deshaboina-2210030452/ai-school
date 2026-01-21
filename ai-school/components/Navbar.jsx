import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display:"flex", justifyContent:"space-evenly" ,padding: 10, background: "#222", color: "#fff" }}>
      <Link href="/">Home</Link>
      <Link href="/quiz">Quiz</Link>
    </nav>
  );
}
