import { useContext, useState } from "react";
import { appContext, contentContext } from "../../../App";
import { useTokenRefresh } from "../../../helpers/Hooks";
import NewPostTextEditor from "./NewPostTextEditor";
import NewPostData from "./NewPostData";
import PageHeading from "../../PageComponents/PageHeading";
import { domain } from "../../../helpers/domain";
export default function NewPostForm({
  newPost,
  handleChange,
  handleSnippetChange,
  handleSelectChange,
  handleSubheadingChange,
  handleMainTextChange,
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
        subheading: newPost.content.subheading,
        snippets: newPost.content.snippets[0] ?? "",
        main_text: newPost.content.main_text,
      };
      const postTags = newPost.tags.replaceAll(" ", "").split(",");
      const uniqueTags = [...new Set(postTags)];
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("content", JSON.stringify(contentObj));
      formData.append("category", newPost.category._id || categories[0]._id); //workaround: first select element before changes will always be categories[0], so we default to submitting the request with that
      formData.append("tags", JSON.stringify(uniqueTags));
      formData.append("is_published", newPost.is_published);
      const imageInput = document.querySelector('input[name="image_sources"]');
      for (const file of imageInput.files) {
        formData.append("image_sources", file);
      }

      const response = await fetch(`${domain}/api/posts/new`, {
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
      <PageHeading heading={"New Post"} />
      <form
        action={`http://localhost:3000/api/posts/new`}
        encType="multipart/form-data"
        className="new-post-form"
      >
        <NewPostData
          newPost={newPost}
          categories={categories}
          handleChange={handleChange}
          handleSnippetChange={handleSnippetChange}
          handleSubheadingChange={handleSubheadingChange}
          handleSelectChange={handleSelectChange}
          handleArrayChange={handleArrayChange}
          handleCheckbox={handleCheckbox}
          handleSubmit={handleSubmit}
        />
        <NewPostTextEditor
          newPost={newPost}
          handleMainTextChange={handleMainTextChange}
        />
      </form>
    </section>
  );
}
