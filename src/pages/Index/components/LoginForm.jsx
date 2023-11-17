import { useState } from "react";
import { useContext } from "react";
import { appContext, loginContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { domain } from "../../../helpers/domain";
export default function LoginForm() {
  const nav = useNavigate();
  const { updateAccessToken, updateRefreshToken } = useContext(appContext);
  const { handleLogin } = useContext(loginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${domain}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      // Handle the response data as needed
      //get token
      const { accessToken, refreshToken, user } = data;
      updateAccessToken(accessToken);
      updateRefreshToken(refreshToken);
      handleLogin(user);
      nav("/dashboard");
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors
    }
  }
  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label className="login-label" htmlFor="username">
        Username:
      </label>
      <input
        className="login-input"
        type="text"
        id="username"
        name="username"
        placeholder="Enter username"
        value={username}
        onChange={(e) => {
          handleUsernameChange(e);
        }}
        required
      />
      <label className="login-label" htmlFor="password">
        Password:
      </label>
      <input
        className="login-input"
        type="password"
        id="password"
        name="password"
        value={password}
        placeholder="Enter password"
        onChange={(e) => {
          handlePasswordChange(e);
        }}
        required
      />

      <button className="btn-primary--login" type="submit">
        LOGIN
      </button>
    </form>
  );
}
