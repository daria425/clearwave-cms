import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contentContext } from "../../App";
import BlogCard from "./components/BlogCard";
import Layout from "../PageComponents/Layout";
import Category from "./components/Category";
export default function Dashboard() {
  const navigate = useNavigate();
  const { blogPosts, postsLoading, categoriesLoading, categories } =
    useContext(contentContext);
  return (
    <Layout>
      {postsLoading || categoriesLoading ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        <main className="dashboard">
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
          <section className="categories">
            <ul className="categories-wrapper">
              {categories.map((category) => (
                <Category key={category._id} category={category} />
              ))}
            </ul>
            <button onClick={() => navigate(`/new-category`)}>
              new category
            </button>
          </section>
        </main>
      )}
    </Layout>
  );
}
