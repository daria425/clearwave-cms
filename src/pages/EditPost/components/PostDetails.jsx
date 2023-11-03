import { Link, useNavigate } from "react-router-dom";
export default function PostDetails({ selectedPost }) {
  const nav = useNavigate();
  return (
    <section className="post-details-summary">
      <h1 className="post-details-title-summary">
        Title: {selectedPost.title}
      </h1>
      <h3 className="post-details-label">Subheading:</h3>
      <p className="post-details-content">{selectedPost.content.subheading}</p>
      <button
        className="btn-outline"
        onClick={() => {
          nav(`/${selectedPost._id}/details`);
        }}
      >
        VIEW DETAILS
      </button>
      {/* area for comments */}
    </section>
  );
}
