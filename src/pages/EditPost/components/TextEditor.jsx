import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contentContext } from "../../../App";
export default function TextEditor() {
  const { id } = useParams();
  const [selectedPost, setSelectedPost] = useState(false);
  const { blogPosts, postsLoading } = useContext(contentContext);

  useEffect(() => {
    if (!postsLoading) {
      const post = blogPosts.find((post) => post._id === id);
      setSelectedPost(post); // If post is not found, set an empty object
    }
  }, [blogPosts, id, postsLoading]);
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

  if (!selectedPost) {
    return <p>Loading...</p>;
  }
  return (
    <div className="texteditor">
      <h2 className="texteditor-title">{selectedPost.title}</h2>
      <label htmlFor="main_text" className="texteditor-label-main">
        Edit post content:
        <textarea
          className="texteditor-textarea"
          name="content.main_text"
          onChange={(e) => {
            handleNestedTextChange(e);
          }}
          value={selectedPost.content.main_text}
          required
        ></textarea>
      </label>
      <button className="btn-primary">SAVE AND CLOSE</button>
    </div>
  );
}
