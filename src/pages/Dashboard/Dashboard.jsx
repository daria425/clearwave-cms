import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../App";
import BlogCard from "./components/BlogCard";
export default function Dashboard() {
  const navigate = useNavigate();
  const { blogPosts, postsLoading } = useContext(appContext);
  if (!postsLoading) {
    console.log(blogPosts);
  }
  return (
    <>
      {postsLoading ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        blogPosts.map((post) => <BlogCard key={post._id} post={post} />)
      )}
      <button onClick={() => navigate(`/new`)}>+</button>
    </>
  );
}
