import { Link } from "react-router-dom";

export default function SideBarNavLinks() {
  return (
    <section className="sidebar--navigation">
      <Link to="/dashboard" className="sidebar--link">
        Dashboard
      </Link>
      <Link to="/content" className="sidebar--link">
        Content
      </Link>
      <Link to="/categories" className="sidebar--link">
        Categories
      </Link>
    </section>
  );
}
