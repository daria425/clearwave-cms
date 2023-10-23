import NewCategoryForm from "./components/NewCategoryForm";
import NewCategoryDetails from "./components/NewCategoryDetails";
import { useState } from "react";
export default function NewCategoryPage() {
  const [category, setCategory] = useState({
    name: "",
    posts: [],
  });
  function handleNameChange(e) {
    setCategory({ ...category, name: e.target.value });
  }
  return (
    <>
      <NewCategoryDetails category={category} />
      <NewCategoryForm
        handleNameChange={handleNameChange}
        category={category}
      />
    </>
  );
}
