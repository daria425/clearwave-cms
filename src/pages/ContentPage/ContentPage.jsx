import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contentContext } from "../../App";
import BlogCard from "./components/BlogCard";
import Layout from "../PageComponents/Layout";
export default function Dashboard() {
  const navigate = useNavigate();
  const { blogPosts, postsLoading } = useContext(contentContext);
  return (
    <Layout>
      {postsLoading ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        <main className="content">
          <section className="posts">
            <div className="posts-wrapper">
              {blogPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
            <button
              className="btn-floating-action--new-post"
              onClick={() => navigate(`/new`)}
            >
              +
            </button>
          </section>
        </main>
      )}
    </Layout>
  );
}
