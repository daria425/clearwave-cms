import NewPostImages from "./NewPostImages";
export default function NewPostDetails({ newPost }) {
  return (
    <section>
      <NewPostImages newPost={newPost} />
      <h1>{newPost.title}</h1>
      <h3>Subheadings:</h3>
      {newPost.content.subheadings.length > 0 &&
      newPost.content.subheadings[0] !== ""
        ? newPost.content.subheadings.map((subheading, index) => (
            <p key={index}>{subheading}</p>
          ))
        : "No subheadings"}
      <h3>Snippets:</h3>
      {newPost.content.snippets.length > 0 && newPost.content.snippets[0] !== ""
        ? newPost.content.snippets.map((snippet, index) => (
            <p key={index}>{snippet}</p>
          ))
        : "No snippets"}
      <h3>Main Text:</h3>
      <p>{newPost.content.main_text}</p>
      <h3>Category:</h3>
      <p>{newPost.category.name}</p>
      <h3>Tags:</h3>
      <ul>
        {newPost.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </section>
  );
}
