import { useState, useEffect, useContext } from "react";
import { contentContext } from "../../App";
import { useParams } from "react-router-dom";
import CategoryDashboard from "./components/CategoryDashboard";
import Layout from "../PageComponents/Layout";
export default function CategoryDetailPage() {
  const [selectedCategory, setSelectedCategory] = useState(false);
  const { id } = useParams();
  const { categories, categoriesLoading } = useContext(contentContext);
  useEffect(() => {
    if (!categoriesLoading) {
      const category = categories.find((category) => category._id === id);
      setSelectedCategory(category); // If post is not found, set an empty object
    }
  }, [categoriesLoading, id, categories]);

  return (
    <Layout>
      {!selectedCategory ? (
        <p>Loading...</p>
      ) : (
        <CategoryDashboard selectedCategory={selectedCategory} />
      )}
    </Layout>
  );
}
