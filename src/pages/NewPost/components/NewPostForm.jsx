import { useContext, useState } from "react";
import { appContext, contentContext } from "../../../App";
import { useTokenRefresh } from "../../../helpers/Hooks";
import Modal from "../../EditPost/components/Modal";
export default function NewPostForm({
  newPost,
  handleChange,
  handleNestedArrayChange,
  handleSelectChange,
  handleNestedTextChange,
  handleCheckbox,
  handleArrayChange,
  handleFileUpload,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  //first make the object with just the key value pairs needed for form
  const [responseError, setResponseError] = useState(false);
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const { handleNewPost, categories } = useContext(contentContext);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  if (categories.length === 0) {
    return <p>Loading...</p>;
  }
  function handleModal() {
    setModalOpen(!modalOpen);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const contentObj = {
        subheadings: newPost.content.subheadings[0] ?? "",
        snippets: newPost.content.snippets[0] ?? "",
        main_text: newPost.content.main_text,
      };
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("content", JSON.stringify(contentObj));
      formData.append("category", newPost.category._id || categories[0]._id); //workaround: first select element before changes will always be categories[0], so we default to submitting the request with that
      formData.append("tags", JSON.stringify(newPost.tags));
      formData.append("is_published", newPost.is_published);
      const imageInput = document.querySelector('input[name="image_sources"]');
      for (const file of imageInput.files) {
        formData.append("image_sources", file);
      }

      const response = await fetch(`http://localhost:3000/api/posts/new`, {
        method: "POST",
        credentials: "include",
        headers: {
          // "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${accessToken}`,
          "x-api-key": "svintus", // Include  API key
        },
        body: formData,
      });
      if (response.ok) {
        const savedPost = await response.json();
        handleNewPost(savedPost);
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
  return (
    <>
      {modalOpen && (
        <Modal responseError={responseError} handleModal={handleModal} />
      )}
      <form
        action={`http://localhost:3000/api/posts/new`}
        encType="multipart/form-data"
      >
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
                {newPost.content.main_text}
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
          onClick={(e) => {
            handleSubmit(e);
          }}
          // onClick={(e) => {
          //   handleSubmit(e);
          // }}
        >
          Save Post
        </button>
      </form>
    </>
  );
}
