import { useLocation } from "react-router-dom";
import Header from "./Header";
import SideBarNav from "./Sidebar/SideBarNav";
import { useState } from "react";
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function handleSidebarOpen() {
    console.log("function passed");
    setSidebarOpen(true);
  }
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" ? (
        <>
          <Header handleSidebarOpen={handleSidebarOpen} />
          <SideBarNav sidebarOpen={sidebarOpen} />
        </>
      ) : null}
      {children}
    </>
  );
}
