import { useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { appContext, contentContext } from "../../../App";
import { useTokenRefresh } from "../../../helpers/Hooks";
import Modal from "./Modal";
export default function EditForm({
  selectedPost,
  handleChange,
  handleNestedArrayChange,
  handleSelectChange,
  handleNestedTextChange,
  handleCheckbox,
  handleArrayChange,
  handleFileUpload,
}) {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const { handlePostUpdate, categories } = useContext(contentContext);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);

  function handleModal() {
    setModalOpen(!modalOpen);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const contentObj = {
        subheadings: selectedPost.content.subheadings[0] ?? "",
        snippets: selectedPost.content.snippets[0] ?? "",
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
        console.log(file);
        formData.append("image_sources", file);
      }
      console.log(accessToken);
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
        handlePostUpdate(e, selectedPost);
      } else {
        throw new Error(
          `Server response failed with status code: ${response.statusText}`
        );
      }
    } catch (err) {
      setResponseError(err.message);
      console.log(err);
    } finally {
      handleModal();
    }
  }
  if (categories.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {modalOpen && (
        <Modal responseError={responseError} handleModal={handleModal} />
      )}
      <form
        action={`http://localhost:3000/api/posts/${id}/update`}
        encType="multipart/form-data"
      >
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
          <input
            type="file"
            name="image_sources"
            onChange={(e) => {
              handleFileUpload(e);
            }}
            multiple
          ></input>
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
            handleSubmit(e);
          }}
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
