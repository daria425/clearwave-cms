import { useState } from "react";
import NewPostForm from "./components/NewPostForm";
import NewPostDetails from "./components/NewPostDetails";
export default function NewPostPage() {
  const [newPost, setNewPost] = useState({
    category: "",
    content: {
      snippets: [],
      subheadings: [],
    },
    image_sources: [],
    tags: [],
    title: "",
    is_published: false,
  });
  function handleChange(e) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }
  function handleNestedArrayChange(e) {
    const [firstProp, nestedProp] = e.target.name.split(".");
    setNewPost({
      ...newPost,
      [firstProp]: {
        ...newPost[firstProp],
        [nestedProp]: [e.target.value],
      },
    });
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
      console.log(results);
      setNewPost({ ...newPost, image_sources: results });
      // Use the results array, which contains objects with data and contentType
    });
    // setNewPost({ ...NewPost, uploaded_images });
  }

  function handleNestedTextChange(e) {
    const [firstProp, nestedProp] = e.target.name.split(".");
    setNewPost({
      ...newPost,
      [firstProp]: {
        ...newPost[firstProp],
        [nestedProp]: e.target.value,
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
    const newTags = [e.target.value];
    setNewPost({
      ...newPost,
      tags: newTags, //adds a tag as the first element, if there are already tags then concats into the array (will be used on multiple intput fields)
    });
  }
  function handleImageDelete(e) {
    const newImages = newPost.image_sources.filter(
      (image) => image._id !== e.target.id
    ); //make new array where image id does not equal to btn id
    setNewPost({ ...newPost, image_sources: newImages });
  }
  return (
    <>
      <NewPostDetails newPost={newPost} />
      <NewPostForm
        newPost={newPost}
        handleChange={handleChange}
        handleNestedArrayChange={handleNestedArrayChange}
        handleSelectChange={handleSelectChange}
        handleNestedTextChange={handleNestedTextChange}
        handleCheckbox={handleCheckbox}
        handleArrayChange={handleArrayChange}
        handleFileUpload={handleFileUpload}
      />
    </>
  );
}
