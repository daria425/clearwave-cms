import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { appContext } from "../../App";
import { useState } from "react";
import PostDetails from "./components/PostDetails";
import EditForm from "./components/EditPostForm";
export default function EditPage() {
  const [selectedPost, setSelectedPost] = useState(false);
  const { id } = useParams();
  const { blogPosts, isLoading } = useContext(appContext);

  useEffect(() => {
    if (!isLoading) {
      console.log("All blog posts:", isLoading, blogPosts);
      const post = blogPosts.find((post) => post._id === id);
      console.log(post);
      setSelectedPost(post); // If post is not found, set an empty object
    }
  }, [blogPosts, id, isLoading]);
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
    const newTags = selectedPost.tags.map((tag) =>
      tag === e.target.name ? e.target.value : tag
    );
    setSelectedPost({ ...selectedPost, tags: newTags });
  }
  return (
    <>
      {!selectedPost ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        <>
          <PostDetails selectedPost={selectedPost} />
          <EditForm
            selectedPost={selectedPost}
            handleChange={handleChange}
            handleNestedArrayChange={handleNestedArrayChange}
            handleSelectChange={handleSelectChange}
            handleNestedTextChange={handleNestedTextChange}
            handleCheckbox={handleCheckbox}
            handleArrayChange={handleArrayChange}
          />
        </>
      )}
    </>
  );
}
