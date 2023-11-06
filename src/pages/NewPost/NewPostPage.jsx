import { useState } from "react";
import NewPostForm from "./components/NewPostForm";
import Layout from "../PageComponents/Layout";
export default function NewPostPage() {
  const [newPost, setNewPost] = useState({
    category: "",
    content: {
      main_text: "",
      snippets: [""],
      subheading: "",
    },
    image_sources: [],
    tags: "",
    title: "",
    is_published: false,
  });
  function handleChange(e) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  function handleSubheadingChange(e) {
    setNewPost({
      ...newPost,
      content: {
        ...newPost.content,
        subheading: e.target.value,
      },
    });
  }
  function handleMainTextChange(e) {
    setNewPost({
      ...newPost,
      content: {
        ...newPost.content,
        main_text: e.target.value,
      },
    });
  }
  function handleSnippetChange(e) {
    const updatedSnippets = [...newPost.content.snippets]; // Create a copy of the snippets array
    updatedSnippets[e.target.id] = e.target.value;
    // setNewPost({
    //   ...newPost,
    //   [firstProp]: {
    //     ...newPost[firstProp],
    //     [nestedProp]: e.target.value,
    //   },
    // });
    setNewPost({
      ...newPost,
      content: {
        ...newPost.content,
        snippets: updatedSnippets,
      },
    });
  }
  function handleSelectChange(arr, e) {
    const categoryObj = arr.find((category) => category._id === e.target.value);
    console.log(categoryObj);
    setNewPost({
      ...newPost,
      category: categoryObj,
    });
  }

  function handleCheckbox(e) {
    setNewPost({
      ...newPost,
      is_published: e.target.checked ? true : false,
    });
  }
  function handleArrayChange(e) {
    //happens separate from form submission
    const newTags = e.target.value;
    setNewPost({
      ...newPost,
      tags: newTags,
    });
  }

  return (
    <Layout>
      <NewPostForm
        newPost={newPost}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSnippetChange={handleSnippetChange}
        handleSubheadingChange={handleSubheadingChange}
        handleMainTextChange={handleMainTextChange}
        handleCheckbox={handleCheckbox}
        handleArrayChange={handleArrayChange}
      />
    </Layout>
  );
}
