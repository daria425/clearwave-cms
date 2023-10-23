import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../App";
import BlogCard from "./components/BlogCard";
import Layout from "../PageComponents/Layout";
import Category from "./components/Category";
export default function Dashboard() {
  const navigate = useNavigate();
  const { blogPosts, postsLoading, categoriesLoading, categories } =
    useContext(appContext);
  return (
    <Layout>
      {postsLoading || categoriesLoading ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        <>
          <section>
            {blogPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
            <button onClick={() => navigate(`/new`)}>new post</button>
          </section>
          <section>
            <ul>
              {categories.map((category) => (
                <Category key={category._id} category={category} />
              ))}
            </ul>
            <button onClick={() => navigate(`/new-category`)}>
              new category
            </button>
          </section>
        </>
      )}
    </Layout>
  );
}
