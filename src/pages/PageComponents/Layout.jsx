import { useLocation } from "react-router-dom";
import Header from "./Header";
import SideBarNav from "./Sidebar/SideBarNav";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { contentContext } from "../../App";
export default function Layout({ children }) {
  const { postsLoading, categoriesLoading } = useContext(contentContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    breakpoint: 768,
  });
  // useEffect(() => {
  //   if (window.innerWidth > breakpoint) {
  //     setIsDesktop(true);
  //     console.log("desktop set to true");
  //   } else {
  //     setIsDesktop(false);
  //     console.log("desktop set to false");
  //   }

  //   function handleResize() {
  //     if (window.innerWidth > breakpoint) {
  //       setIsDesktop(true);
  //       console.log("desktop set to true");
  //     } else {
  //       setIsDesktop(false);
  //       console.log("desktop set to false");
  //     }
  //   }
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    function handleResize() {
      setDimensions({ ...dimensions, width: window.innerWidth });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function handleSidebarOpen() {
    setSidebarOpen(true);
  }
  function handleSidebarClose() {
    setSidebarOpen(false);
  }
  const { pathname } = useLocation();

  return (
    <section className="wrapper">
      {pathname !== "/" ? (
        <>
          <SideBarNav
            dimensions={dimensions}
            sidebarOpen={sidebarOpen}
            handleSidebarClose={handleSidebarClose}
          />
          <Header
            dimensions={dimensions}
            handleSidebarOpen={handleSidebarOpen}
          />
        </>
      ) : null}
      {postsLoading || categoriesLoading ? <LoadingPage /> : children}
    </section>
  );
}
