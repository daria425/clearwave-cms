import { useContext } from "react";
import { appContext } from "../../App";
import BlogCard from "./components/BlogCard";
export default function Dashboard({ isLoading }) {
  const { blogPosts } = useContext(appContext);
  if (!isLoading) {
    console.log(blogPosts);
  }
  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        blogPosts.map((post) => <BlogCard key={post._id} post={post} />)
      )}
    </>
  );
}
