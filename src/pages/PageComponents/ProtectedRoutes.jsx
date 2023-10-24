import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ userLogin, redirectPath = "/login" }) {
  if (!userLogin) {
    return <Navigate to={redirectPath} />;
  } else {
    return <Outlet />;
  }
}
