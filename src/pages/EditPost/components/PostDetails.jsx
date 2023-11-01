export default function PostDetails({ selectedPost, handleShowDetails }) {
  return (
    <section className="post-details-summary">
      <h1 className="post-details-title-summary">{selectedPost.title}</h1>
      <h3 className="post-details-label">Subheading:</h3>
      <p className="post-details-content">{selectedPost.content.subheading}</p>
      <button className="btn-outline" onClick={handleShowDetails}>
        VIEW DETAILS
      </button>
      {/* area for comments */}
    </section>
  );
}
