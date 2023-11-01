import PostImages from "./PostImages";
export default function PostDetails({ selectedPost }) {
  return (
    <section className="post-details">
      <PostImages selectedPost={selectedPost} />
      <h1 className="post-details-title">{selectedPost.title}</h1>
      <h3 className="post-details-label">Subheadings:</h3>
      <p>{selectedPost.content.subheading}</p>
      <h3 className="post-details-label"> Snippets:</h3>
      {selectedPost.content.snippets.length > 0 &&
      selectedPost.content.snippets[0] !== ""
        ? selectedPost.content.snippets.map((snippet, index) => (
            <p key={index}>{snippet}</p>
          ))
        : "No snippets"}
      <h3 className="post-details-label">Main Text:</h3>
      <p className="post-details-main-text">{selectedPost.content.main_text}</p>
      <h3 className="post-details-label">Category:</h3>
      <p>{selectedPost.category.name}</p>
      <h3 className="post-details-label">Tags:</h3>
      <ul>
        {selectedPost.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      {/* area for comments */}
    </section>
  );
}
