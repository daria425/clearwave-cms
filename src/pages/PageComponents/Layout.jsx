import { useLocation } from "react-router-dom";
import Header from "./Header";
import SideBarNav from "./Sidebar/SideBarNav";
import { useState, useEffect } from "react";
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const breakpoint = 768;
  useEffect(() => {
    if (window.innerWidth > breakpoint) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }

    function handleResize() {
      if (window.innerWidth > breakpoint) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function handleSidebarOpen() {
    console.log("function passed");
    setSidebarOpen(true);
  }
  const { pathname } = useLocation();

  return (
    <section className="wrapper">
      {pathname !== "/" ? (
        <>
          <SideBarNav isDesktop={isDesktop} sidebarOpen={sidebarOpen} />
          <Header isDesktop={isDesktop} handleSidebarOpen={handleSidebarOpen} />
        </>
      ) : null}
      {children}
    </section>
  );
}
