import { useState, useEffect, useContext } from "react";
import { contentContext } from "../../App";
import { useParams } from "react-router-dom";
import { useSelectedCategory } from "../../helpers/Hooks";
import CategoryDashboard from "./components/CategoryDashboard";
import Layout from "../PageComponents/Layout";
export default function CategoryDetailPage() {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();

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
