export default function PostDetails({ selectedPost }) {
  return (
    <section className="post-details-summary">
      <h1 className="post-details-title-summary">
        Title: {selectedPost.title}
      </h1>
      <h3 className="post-details-label">Subheading:</h3>
      <p className="post-details-content">{selectedPost.content.subheading}</p>

      {/* area for comments */}
    </section>
  );
}
