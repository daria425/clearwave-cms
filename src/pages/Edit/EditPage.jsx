import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { appContext } from "../../App";
import { useState } from "react";
import "./styles.css";
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
  function handleFileUpload(e) {
    const fileArray = [...e.target.files];
    const uploaded_images = fileArray.map((file) => URL.createObjectURL(file));
    console.log(uploaded_images);
    // setSelectedPost({ ...selectedPost, uploaded_images });
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
  function handleImageDelete(e) {
    const newImages = selectedPost.image_sources.filter(
      (image) => image._id !== e.target.id
    ); //make new array where image id does not equal to btn id
    setSelectedPost({ ...selectedPost, image_sources: newImages });
  }
  return (
    <>
      {!selectedPost ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        <>
          <PostDetails
            selectedPost={selectedPost}
            handleImageDelete={handleImageDelete}
          />
          <EditForm
            selectedPost={selectedPost}
            handleChange={handleChange}
            handleNestedArrayChange={handleNestedArrayChange}
            handleSelectChange={handleSelectChange}
            handleNestedTextChange={handleNestedTextChange}
            handleCheckbox={handleCheckbox}
            handleArrayChange={handleArrayChange}
            handleFileUpload={handleFileUpload}
          />
        </>
      )}
    </>
  );
}
