import LoginComponent from "./components/LoginComponent";
import { Navigate } from "react-router-dom";
export default function Index({ userLogin }) {
  if (userLogin) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <section className="login">
      <LoginComponent />
    </section>
  );
}
