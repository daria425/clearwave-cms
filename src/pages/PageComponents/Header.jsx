import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../App";
export default function Header() {
  const nav = useNavigate();
  const { handleLogout } = useContext(loginContext);
  async function logout() {
    const response = await fetch("http://localhost:3000/api/logout", {
      credentials: "include",
    });
    if (response.ok) {
      handleLogout();
      nav("/");
    }
  }
  return (
    <header>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
