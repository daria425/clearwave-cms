export default function Category({ category }) {
  return (
    <li className="category--card">
      <h3>{category.name}</h3>
    </li>
  );
}
