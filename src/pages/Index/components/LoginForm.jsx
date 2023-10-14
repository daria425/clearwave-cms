import { useState } from "react";
import { useContext } from "react";
import { appContext } from "../../../App";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const nav = useNavigate();
  const { updateAccessToken, updateRefreshToken } = useContext(appContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Server response:", data);
      // Handle the response data as needed
      //get token
      const { accessToken, refreshToken } = data;
      updateAccessToken(accessToken);
      updateRefreshToken(refreshToken);
      setSuccessfulLogin(true);
      nav("/dashboard");
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors
    }
  }
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => {
          handleUsernameChange(e);
        }}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => {
          handlePasswordChange(e);
        }}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
}
