import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { contentContext } from "../../App";
import { useState } from "react";
import PostDetails from "./components/PostDetails";
import EditForm from "./components/EditPostForm";
import TextEditor from "./components/TextEditor";
import PostDetailsCard from "./components/PostDetailsCard";
import LoadingPage from "../LoadingPage/LoadingPage";
import Layout from "../PageComponents/Layout";
export default function EditPage() {
  const [selectedPost, setSelectedPost] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { id } = useParams();
  const { blogPosts, postsLoading } = useContext(contentContext);
  const [showTextEditor, setShowTextEditor] = useState(false);
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
  function handleShowTextEditor(e) {
    e.preventDefault();
    setShowTextEditor(true);
  }
  function handleCloseTextEditor() {
    setShowTextEditor(false);
  }
  function handleFileUpload(e) {
    const fileArray = [...e.target.files];
    const fileObjects = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          resolve({
            data,
            contentType: file.type,
          });
        };
        reader.readAsArrayBuffer(file);
      });
    });
    Promise.all(fileObjects).then((results) => {
      setSelectedPost({ ...selectedPost, image_sources: results });
      // Use the results array, which contains objects with data and contentType
    });
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
  function handleShowDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <Layout>
      {!selectedPost ? (
        <LoadingPage />
      ) : (
        <section
          className="content--edit-page"
          style={{ flexGrow: showDetails ? "1" : "0" }} //make div stretch to fill page when the details card is on display to center it
        >
          {!showTextEditor ? (
            // Content when !showTextEditor
            <>
              {showDetails ? (
                // Content when showDetails is true
                <PostDetailsCard
                  selectedPost={selectedPost}
                  handleShowDetails={handleShowDetails}
                />
              ) : (
                // Content when showDetails is false
                <>
                  <PostDetails
                    selectedPost={selectedPost}
                    handleShowDetails={handleShowDetails}
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
                    handleShowTextEditor={handleShowTextEditor}
                  />
                </>
              )}
            </>
          ) : (
            // Content when showTextEditor
            <TextEditor
              selectedPost={selectedPost}
              handleNestedTextChange={handleNestedTextChange}
              handleCloseTextEditor={handleCloseTextEditor}
            />
          )}
        </section>
      )}
    </Layout>
  );
}
