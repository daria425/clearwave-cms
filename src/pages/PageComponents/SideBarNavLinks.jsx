import { Link } from "react-router-dom";

export default function NavLinks() {
  return (
    <div>
      <Link to="/dashboard" className="header--link">
        Dashboard
      </Link>
      <Link to="/content" className="header--link">
        Content
      </Link>
      <Link to="/categories" className="header--link">
        Categories
      </Link>
    </div>
  );
}
