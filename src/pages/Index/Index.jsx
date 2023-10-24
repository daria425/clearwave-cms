import LoginForm from "./components/LoginForm";
import { useContext, useEffect } from "react";
import { loginContext } from "../../App";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const nav = useNavigate();
  const { userLogin } = useContext(loginContext);
  useEffect(() => {
    if (userLogin) {
      nav("/dashboard");
    }
  }, [userLogin]);
  return (
    <>
      <h1>hi</h1>
      <LoginForm />
    </>
  );
}
