export default function TextEditor({
  selectedPost,
  handleNestedTextChange,
  handleCloseTextEditor,
}) {
  return (
    <div className="edit-form-texteditor">
      <label htmlFor="main_text">
        Body text:
        <textarea
          className="edit-form-textarea"
          name="content.main_text"
          onChange={(e) => {
            handleNestedTextChange(e);
          }}
          required
        >
          {selectedPost.content.main_text}
        </textarea>
      </label>
      <button className="btn-primary" onClick={handleCloseTextEditor}>
        SAVE
      </button>
    </div>
  );
}
