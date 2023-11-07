import { useNavigate } from "react-router-dom";

export default function Category({ category }) {
  const nav = useNavigate();
  return (
    <li className="category--card">
      <h3>{category.name}</h3>
      <button
        className="btn-outline"
        onClick={() => {
          nav(`/category/${category._id}`);
        }}
      >
        VIEW DETAILS
      </button>
    </li>
  );
}
