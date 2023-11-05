export default function NewPostTextEditor({ newPost, handleNestedTextChange }) {
  return (
    <section className="texteditor--new-post">
      <label htmlFor="main_text">
        Body text:
        <div
          className="grow-wrap"
          data-replicated-value={newPost.content.main_text}
        >
          <textarea
            className="textarea--new-post"
            name="content.main_text"
            value={newPost.content.main_text}
            onChange={(e) => {
              handleNestedTextChange(e);
            }}
            required
          ></textarea>
        </div>
      </label>
    </section>
  );
}
