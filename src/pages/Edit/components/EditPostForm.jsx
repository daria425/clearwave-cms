import { useParams } from "react-router-dom";
import { useData } from "../../../Hooks";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { appContext } from "../../../App";
export default function EditForm({
  selectedPost,
  handleChange,
  handleNestedArrayChange,
  handleSelectChange,
  handleNestedTextChange,
  handleCheckbox,
  handleArrayChange,
}) {
  const { data, error, isLoading } = useData("api/category");
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const { handlePostUpdate } = useContext(appContext);
  useEffect(() => {
    if (!isLoading) {
      setCategories(data);
    }
  }, [data, isLoading]);
  if (categories.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <form action={`http://localhost:3000/api/posts/${id}/update`}>
      <label htmlFor="title">
        Post Title:
        <input
          name="title"
          type="text"
          required
          value={selectedPost.title}
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
              value={selectedPost.content.subheadings[0] ?? ""}
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
              value={selectedPost.content.snippets[0] ?? ""}
              onChange={(e) => {
                handleNestedArrayChange(e);
              }}
              type="text"
              required
            />
          </label>
          <label htmlFor="main_text">
            Body text:
            <textarea
              name="content.main_text"
              rows={5}
              cols={10}
              onChange={(e) => {
                handleNestedTextChange(e);
              }}
              required
            >
              {selectedPost.content.main_text}
            </textarea>
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
      <label htmlFor="tags-group">
        <fieldset>
          {selectedPost.tags.map((tag, index) => {
            return (
              <label htmlFor="tag" key={index}>
                Tag {index + 1}
                <input
                  type="text"
                  name={tag}
                  id={index}
                  value={tag}
                  onChange={(e) => {
                    handleArrayChange(e);
                  }}
                ></input>
              </label>
            );
          })}
        </fieldset>
      </label>
      <label htmlFor="is_published">
        Publish?
        <input
          type="checkbox"
          name="is_published"
          checked={selectedPost.is_published}
          onChange={(e) => {
            handleCheckbox(e);
          }}
        ></input>
      </label>
      <button
        id={selectedPost._id}
        onClick={(e) => {
          handlePostUpdate(e, selectedPost);
        }}
      >
        Save Changes
      </button>
    </form>
  );
}
