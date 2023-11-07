import { useNavigate } from "react-router-dom";

export default function CategoryPostList({ selectedCategory }) {
  const nav = useNavigate();
  return (
    <ul className="category-details--post-list">
      {selectedCategory.posts.map((post) => {
        return (
          <li key={post._id} className="category-details--post-list-item">
            <h3>{post.title}</h3>
            <div className="category-details--tag-group">
              {post.tags.map((tag, index) => {
                return (
                  <div key={index} className="tag-card--category-details">
                    {tag}
                  </div>
                );
              })}
            </div>
            <button
              className="btn-outline"
              id={post._id}
              onClick={(e) => {
                nav(`../../../${e.target.id}/details`);
              }}
            >
              VIEW DETAILS
            </button>
          </li>
        );
      })}
    </ul>
  );
}
