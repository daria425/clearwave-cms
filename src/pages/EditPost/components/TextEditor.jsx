export default function TextEditor({
  selectedPost,
  handleNestedTextChange,
  handleCloseTextEditor,
}) {
  return (
    <div className="texteditor">
      <h2 className="texteditor-title">{selectedPost.title}</h2>
      <label htmlFor="main_text" className="texteditor-label-main">
        Edit post content:
        <textarea
          className="texteditor-textarea"
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
        SAVE AND CLOSE
      </button>
    </div>
  );
}
