import LoginComponent from "./components/LoginComponent";
import { Navigate } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
export default function Index({ userLogin, postsLoading, categoriesLoading }) {
  if (userLogin) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <section className="login">
      {postsLoading || categoriesLoading ? <LoadingPage /> : <LoginComponent />}
    </section>
  );
}
