import BackButton from "./Icons/BackButton";
import { useNavigate, useLocation } from "react-router";
export default function PageHeading({ heading }) {
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handleBackNav() {
    nav(-1);
  }

  return (
    <section
      className={`page-top${pathname == "/dashboard" ? "--no-btn" : ""}`}
    >
      {pathname !== "/dashboard" ? (
        <BackButton navigationFunction={handleBackNav} />
      ) : null}
      <h1 className="page-heading">{heading}</h1>
    </section>
  );
}
