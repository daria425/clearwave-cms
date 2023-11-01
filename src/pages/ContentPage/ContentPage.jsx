import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contentContext } from "../../App";
import BlogCard from "./components/BlogCard";
import Layout from "../PageComponents/Layout";
import Overlay from "../PageComponents/Overlay";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useState } from "react";
export default function Dashboard() {
  const [postSelected, setPostSelected] = useState(false);
  const navigate = useNavigate();
  function handleSelection() {
    setPostSelected(true);
  }
  function handleUndoSelection() {
    setPostSelected(false);
  }
  const { blogPosts, postsLoading } = useContext(contentContext);
  return (
    <Layout>
      {postsLoading ? (
        <LoadingPage /> // Display a loading message or spinner while loading
      ) : (
        <main className="content">
          <section className="posts">
            <div className="posts-wrapper">
              {blogPosts.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  handleSelection={handleSelection}
                  handleUndoSelection={handleUndoSelection}
                />
              ))}
            </div>
            <button
              className="btn-floating-action--new-post"
              onClick={() => navigate(`/new`)}
            >
              +
            </button>
            {postSelected ? <Overlay /> : null}
          </section>
        </main>
      )}
    </Layout>
  );
}
