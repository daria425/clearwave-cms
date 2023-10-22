import { useNavigate } from "react-router-dom";
export default function Header() {
  const nav = useNavigate();
  async function handleLogout() {
    await fetch("http://localhost:3000/api/logout");
    nav("/");
  }
  return (
    <header>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
