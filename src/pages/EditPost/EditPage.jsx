import { useParams, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { contentContext } from "../../App";
import { useState } from "react";
import PageHeading from "../PageComponents/PageHeading";
import Layout from "../PageComponents/Layout";
import { useSelectedPost } from "../../helpers/Hooks";
export default function EditPage() {
  const { responseLoading, setResponseLoading, selectedPost, setSelectedPost } =
    useSelectedPost();
  // const [selectedPost, setSelectedPost] = useState(false);

  // const [responseLoading, setResponseLoading] = useState(false);
  // const { id } = useParams();
  // const { blogPosts, postsLoading } = useContext(contentContext);
  // useEffect(() => {
  //   if (!postsLoading) {
  //     const post = blogPosts.find((post) => post._id === id);
  //     setSelectedPost(post); // If post is not found, set an empty object
  //   }
  // }, [blogPosts, id, postsLoading]);

  function handleChange(e) {
    setSelectedPost({ ...selectedPost, [e.target.name]: e.target.value });
  }
  function handleNestedArrayChange(e) {
    const [firstProp, nestedProp] = e.target.name.split(".");
    setSelectedPost({
      ...selectedPost,
      [firstProp]: {
        ...selectedPost[firstProp],
        [nestedProp]: [e.target.value],
      },
    });
  }

  function handleTagUpdate(newTag, tagsToDelete) {
    const newTags = selectedPost.tags.filter(
      (tag) => !tagsToDelete.includes(tag)
    );
    if (newTag !== "") {
      newTags.push(newTag);
    }
    setSelectedPost({ ...selectedPost, tags: newTags });
  }
  function handleResponse() {
    setResponseLoading(!responseLoading);
  }

  function handleNestedTextChange(e) {
    const [firstProp, nestedProp] = e.target.name.split(".");
    setSelectedPost({
      ...selectedPost,
      [firstProp]: {
        ...selectedPost[firstProp],
        [nestedProp]: e.target.value,
      },
    });
  }
  function handleSelectChange(arr, e) {
    const categoryObj = arr.find((category) => category._id === e.target.value);
    console.log(categoryObj);
    setSelectedPost({
      ...selectedPost,
      category: categoryObj,
    });
  }

  function handleCheckbox(e) {
    setSelectedPost({
      ...selectedPost,
      is_published: e.target.checked ? true : false,
    });
  }
  function handleArrayChange(e) {
    //happens separate from form submission
    const newTags = selectedPost.tags.map((tag) =>
      tag === e.target.name ? e.target.value : tag
    );
    setSelectedPost({ ...selectedPost, tags: newTags });
  }

  function handleDataUpdate(newPost) {
    setSelectedPost(newPost);
  }

  const outletContext = {
    selectedPost,
    responseLoading,
    handleArrayChange,
    handleChange,
    handleCheckbox,
    handleDataUpdate,
    handleNestedArrayChange,
    handleNestedTextChange,
    handleSelectChange,
    handleResponse,
    handleTagUpdate,
  };
  return (
    <Layout>
      <section className="content--edit-page">
        <PageHeading heading={"Edit Post"} />
        <Outlet context={outletContext} />
      </section>
    </Layout>
  );
}
