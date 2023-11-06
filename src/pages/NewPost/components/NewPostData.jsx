export default function NewPostData({
  newPost,
  categories,
  handleChange,
  handleSnippetChange,
  handleSubheadingChange,
  handleSelectChange,
  handleArrayChange,
  handleCheckbox,
  handleSubmit,
}) {
  return (
    <div className="new-post-form-data">
      <label htmlFor="title" className="new-post-form-label--main">
        Post Title:
        <input
          className="new-post-form-input"
          name="title"
          type="text"
          required
          value={newPost.title}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </label>
      <label htmlFor="content" className="new-post-form-label">
        <fieldset>
          <label htmlFor="subheadings">
            Subheading:
            <input
              className="new-post-form-input"
              name="content.subheading"
              value={newPost.content.subheading}
              onChange={(e) => {
                handleSubheadingChange(e);
              }}
              type="text"
              required
            />
          </label>
          {newPost.content.snippets.map((snippet, index) => {
            return (
              <label
                key={index}
                htmlFor="snippets"
                className="new-post-form-label"
              >
                Snippets:
                <input
                  className="new-post-form-input"
                  name="content.snippets"
                  id={index}
                  value={newPost.content.snippets[index]}
                  onChange={(e) => {
                    handleSnippetChange(e);
                  }}
                  type="text"
                  required
                />
              </label>
            );
          })}
          <label htmlFor="image_sources">
            Upload Images:
            <input
              className="new-post-form-input"
              type="file"
              name="image_sources"
              multiple
            ></input>
          </label>
        </fieldset>
      </label>
      <label htmlFor="category" className="new-post-form-label">
        Category:
        <select
          name="category"
          onChange={(e) => {
            handleSelectChange(categories, e);
          }}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="tags" className="new-post-form-label">
        Tags (comma-separated):
        <input
          type="text"
          className="new-post-form-input"
          onChange={(e) => handleArrayChange(e)}
          required
        ></input>
      </label>
      <label htmlFor="is_published" className="new-post-form-label">
        Publish?
        <input
          className="new-post-form-input--checkbox"
          type="checkbox"
          name="is_published"
          checked={newPost.is_published}
          onChange={(e) => {
            handleCheckbox(e);
          }}
        ></input>
      </label>
      <button
        className="btn-primary--new-post-form"
        onClick={(e) => {
          handleSubmit(e);
        }}
        // onClick={(e) => {
        //   handleSubmit(e);
        // }}
      >
        SAVE POST
      </button>
    </div>
  );
}
