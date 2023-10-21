import PostImages from "./PostImages";
export default function PostDetails({ selectedPost, handleImageDelete }) {
  return (
    <section>
      <PostImages
        selectedPost={selectedPost}
        handleImageDelete={handleImageDelete}
      />
      <h1>{selectedPost.title}</h1>
      <h3>Subheadings:</h3>
      {selectedPost.content.subheadings.length > 0 &&
      selectedPost.content.subheadings[0] !== ""
        ? selectedPost.content.subheadings.map((subheading, index) => (
            <p key={index}>{subheading}</p>
          ))
        : "No subheadings"}
      <h3>Snippets:</h3>
      {selectedPost.content.snippets.length > 0 &&
      selectedPost.content.snippets[0] !== ""
        ? selectedPost.content.snippets.map((snippet, index) => (
            <p key={index}>{snippet}</p>
          ))
        : "No snippets"}
      <h3>Main Text:</h3>
      <p>{selectedPost.content.main_text}</p>
      <h3>Category:</h3>
      <p>{selectedPost.category.name}</p>
      <h3>Tags:</h3>
      <ul>
        {selectedPost.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      {/* area for comments */}
    </section>
  );
}
