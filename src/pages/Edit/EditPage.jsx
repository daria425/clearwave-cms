import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { appContext } from "../../App";
import { useState } from "react";
import PostDetails from "./components/PostDetails";
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
  return (
    <>
      {isLoading || !selectedPost ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        <>
          <PostDetails selectedPost={selectedPost} />
        </>
      )}
    </>
  );
}
