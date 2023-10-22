import { useLocation } from "react-router-dom";
import Header from "./Header";
export default function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" ? <Header /> : null}
      {children}
    </>
  );
}
