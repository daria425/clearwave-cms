export default function NewPostTextEditor({ newPost, handleMainTextChange }) {
  return (
    <section className="texteditor--new-post">
      <label htmlFor="main_text" className="new-post-form-label--texteditor">
        Body text:
      </label>
      <div
        className="grow-wrap"
        data-replicated-value={newPost.content.main_text}
      >
        <textarea
          className="textarea--new-post"
          name="content.main_text"
          value={newPost.content.main_text}
          onChange={(e) => {
            handleMainTextChange(e);
          }}
          required
        ></textarea>
      </div>
    </section>
  );
}
