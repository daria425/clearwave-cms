import EditForm from "./EditPostForm";
import PostDetails from "./PostDetails";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { contentContext } from "../../../App";
import { useState } from "react";
export default function SummaryView() {
  const [selectedPost, setSelectedPost] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const { id } = useParams();
  console.log(id);
  const { blogPosts, postsLoading } = useContext(contentContext);

  useEffect(() => {
    if (!postsLoading) {
      const post = blogPosts.find((post) => post._id === id);
      setSelectedPost(post); // If post is not found, set an empty object
    }
  }, [blogPosts, id, postsLoading]);
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
  if (!selectedPost) {
    return <p>Loading...</p>;
  }
  return (
    <div className="summary-view-wrapper">
      {responseLoading && <Modal modalMessage="Loading" />}
      <PostDetails selectedPost={selectedPost} />
      <EditForm
        handleDataUpdate={handleDataUpdate}
        handleResponse={handleResponse}
        selectedPost={selectedPost}
        handleChange={handleChange}
        handleNestedArrayChange={handleNestedArrayChange}
        handleSelectChange={handleSelectChange}
        handleNestedTextChange={handleNestedTextChange}
        handleCheckbox={handleCheckbox}
        handleArrayChange={handleArrayChange}
      />
    </div>
  );
}
