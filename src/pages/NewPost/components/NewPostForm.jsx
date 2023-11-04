import { useContext, useState } from "react";
import { appContext, contentContext } from "../../../App";
import { useTokenRefresh } from "../../../helpers/Hooks";
import NewPostTextEditor from "./NewPostTextEditor";
import NewPostData from "./NewPostData";
export default function NewPostForm({
  newPost,
  handleChange,
  handleNestedArrayChange,
  handleSelectChange,
  handleNestedTextChange,
  handleCheckbox,
  handleArrayChange,
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
    <section className="content--new-post">
      <form
        action={`http://localhost:3000/api/posts/new`}
        encType="multipart/form-data"
        className="new-post-form"
      >
        <NewPostData
          newPost={newPost}
          categories={categories}
          handleChange={handleChange}
          handleNestedArrayChange={handleNestedArrayChange}
          handleSelectChange={handleSelectChange}
          handleArrayChange={handleArrayChange}
          handleCheckbox={handleCheckbox}
          handleSubmit={handleSubmit}
        />
        <NewPostTextEditor
          newPost={newPost}
          handleNestedTextChange={handleNestedTextChange}
        />
      </form>
    </section>
  );
}
