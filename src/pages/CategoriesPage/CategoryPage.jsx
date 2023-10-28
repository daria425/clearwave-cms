import Layout from "../PageComponents/Layout";
import { useContext } from "react";
import { contentContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Category from "./components/Category";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoriesLoading, categories } = useContext(contentContext);
  return (
    <Layout>
      {categoriesLoading ? (
        <p>Loading...</p> // Display a loading message or spinner while loading
      ) : (
        <main>
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
