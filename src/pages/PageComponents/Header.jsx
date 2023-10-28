import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../App";
import MenuButton from "./Icons/MenuButton";
export default function Header({ handleSidebarOpen }) {
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
    <header className="header">
      <MenuButton handleSidebarOpen={handleSidebarOpen} />
      <h1>ClearWave</h1>
      <button className="btn-primary-colorswap--nav" onClick={logout}>
        LOGOUT
      </button>
    </header>
  );
}
