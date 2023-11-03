import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { appContext, contentContext } from "../../../App";
import { useTokenRefresh } from "../../../helpers/Hooks";
export default function EditForm({
  handleDataUpdate,
  handleResponse,
  selectedPost,
  handleChange,
  handleNestedArrayChange,
  handleSelectChange,
  handleNestedTextChange,
  handleCheckbox,
  handleArrayChange,
  handleTagEditor,
}) {
  const { id } = useParams();
  const [responseError, setResponseError] = useState(false);
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const { handlePostUpdate, categories } = useContext(contentContext);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  const nav = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    handleResponse();
    try {
      const contentObj = {
        subheading: selectedPost.content.subheading,
        snippets: selectedPost.content.snippets,
        main_text: selectedPost.content.main_text,
      };
      console.log(JSON.stringify(selectedPost.tags));
      const formData = new FormData();
      formData.append("title", selectedPost.title);
      // formData.append(
      //   "content.subheadings",
      //   selectedPost.content.subheadings[0] ?? ""
      // );
      // formData.append(
      //   "content.snippets",
      //   selectedPost.content.snippets[0] ?? ""
      // );
      // formData.append("content.main_text", selectedPost.content.main_text);
      formData.append("content", JSON.stringify(contentObj));
      formData.append("category", selectedPost.category._id);
      formData.append("tags", JSON.stringify(selectedPost.tags));
      formData.append("is_published", selectedPost.is_published);

      // Add image files to formData if any
      const imageInput = document.querySelector('input[name="image_sources"]');
      for (const file of imageInput.files) {
        formData.append("image_sources", file);
      }
      const response = await fetch(
        `http://localhost:3000/api/posts/${selectedPost._id}/update`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            // "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`,
            "x-api-key": "svintus", // Include  API key
          },
          body: formData,
        }
      );
      console.log(response);
      if (response.ok) {
        const updatedPost = await response.json();
        console.log(updatedPost);
        handleDataUpdate(updatedPost);
        handlePostUpdate(e, updatedPost);
      } else {
        throw new Error(
          `Server response failed with status code: ${response.statusText}`
        );
      }
    } catch (err) {
      setResponseError(err.message);
      console.log(err);
    } finally {
      handleResponse();
    }
  }
  if (categories.length === 0) {
    return <p>Loading...</p>;
  }
  // if (showTextEditor) {
  //   return (
  //     <div className="edit-form-texteditor">
  //       <label htmlFor="main_text">
  //         Body text:
  //         <textarea
  //           className="edit-form-textarea"
  //           name="content.main_text"
  //           onChange={(e) => {
  //             handleNestedTextChange(e);
  //           }}
  //           required
  //         >
  //           {selectedPost.content.main_text}
  //         </textarea>
  //       </label>
  //     </div>
  //   );
  // } else
  return (
    <>
      <form
        action={`http://localhost:3000/api/posts/${id}/update`}
        encType="multipart/form-data"
        className="edit-form"
      >
        <fieldset className="edit-form-fieldset">
          <label htmlFor="content" className="edit-form-main-label">
            Content
          </label>

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

          <label htmlFor="subheading">
            Subheadings:
            <input
              name="content.subheading"
              value={selectedPost.content.subheading}
              onChange={(e) => {
                handleNestedTextChange(e);
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
          <button
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault();
              nav(`../../${selectedPost._id}/texteditor`);
            }}
          >
            EDIT TEXT
          </button>
          <label htmlFor="image_sources">
            Images:
            <input type="file" name="image_sources" multiple></input>
          </label>
        </fieldset>
        <fieldset className="edit-form-fieldset">
          <label htmlFor="categorization" className="edit-form-main-label">
            Categorization
          </label>
          <label htmlFor="category">
            Category:
            <select
              defaultValue={selectedPost.category._id}
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

          <label htmlFor="tags">
            Tags:
            <div className="tags-group">
              {selectedPost.tags.map((tag, index) => {
                return (
                  <div key={index} className="tag-card">
                    {tag}
                  </div>
                );
              })}
            </div>
          </label>
          <button
            className="btn-outline"
            onClick={(e) => {
              handleTagEditor(e);
            }}
          >
            EDIT TAGS
          </button>
        </fieldset>
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
          className="btn-primary"
          id={selectedPost._id}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          SAVE CHANGES
        </button>
      </form>
    </>
  );
}
