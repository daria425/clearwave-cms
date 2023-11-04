export default function NewPostData({
  newPost,
  categories,
  handleChange,
  handleNestedArrayChange,
  handleSelectChange,
  handleArrayChange,
  handleCheckbox,
  handleSubmit,
}) {
  return (
    <div className="new-post-form-data">
      <label htmlFor="title">
        Post Title:
        <input
          name="title"
          type="text"
          required
          value={newPost.title}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </label>
      <label htmlFor="content">
        <fieldset>
          <label htmlFor="subheadings">
            Subheadings:
            <input
              name="content.subheadings"
              value={newPost.content.subheadings[0] ?? ""}
              onChange={(e) => {
                handleNestedArrayChange(e);
              }}
              type="text"
              required
            />
          </label>
          <label htmlFor="snippets">
            Snippets:
            <input
              name="content.snippets"
              value={newPost.content.snippets[0] ?? ""}
              onChange={(e) => {
                handleNestedArrayChange(e);
              }}
              type="text"
              required
            />
          </label>
        </fieldset>
      </label>
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
      <label htmlFor="image_sources">
        <input type="file" name="image_sources" multiple></input>
      </label>
      <label htmlFor="tags">
        Tags:
        <input type="text" onChange={(e) => handleArrayChange(e)}></input>
      </label>
      <label htmlFor="is_published">
        Publish?
        <input
          type="checkbox"
          name="is_published"
          checked={newPost.is_published}
          onChange={(e) => {
            handleCheckbox(e);
          }}
        ></input>
      </label>
      <button
        className="btn-primary"
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
