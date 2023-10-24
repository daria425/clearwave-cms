import LoginComponent from "./components/LoginComponent";
import FancyScreen from "./components/FancyScreen";
import { Navigate } from "react-router-dom";
import "./index-styles.css";
export default function Index({ userLogin }) {
  if (userLogin) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <section className="login">
      <FancyScreen />
      <LoginComponent />
    </section>
  );
}
