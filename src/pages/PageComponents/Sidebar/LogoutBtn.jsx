import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../../App";
import { domain } from "../../../helpers/domain";
export default function LogoutBtn() {
  const nav = useNavigate();
  const { handleLogout } = useContext(loginContext);
  async function logout() {
    const response = await fetch(`${domain}/api/logout`, {
      credentials: "include",
    });
    if (response.ok) {
      handleLogout();
      nav("/");
    }
  }
  return (
    <button className="btn-primary--logout" onClick={logout}>
      LOGOUT
    </button>
  );
}
