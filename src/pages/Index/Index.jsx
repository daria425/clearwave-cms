import LoginForm from "./components/LoginForm";
import { Navigate } from "react-router-dom";
export default function Index({ userLogin }) {
  if (userLogin) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <h1>hi</h1>
      <LoginForm />
    </>
  );
}
