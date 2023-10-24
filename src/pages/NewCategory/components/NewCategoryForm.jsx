import { useContext } from "react";
import { appContext, contentContext } from "../../../App";
import { useTokenRefresh } from "../../../Hooks";
export default function NewCategoryForm({ handleNameChange, category }) {
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const { handleNewCategory } = useContext(contentContext);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        name: category.name,
        posts: JSON.stringify(category.posts),
      };
      const response = await fetch(`http://localhost:3000/api/category/new`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "x-api-key": "svintus", // Include  API key
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.ok) {
        const savedCategory = await response.json();
        handleNewCategory(savedCategory);
      } else {
        throw new Error(
          `Server response failed with status code: ${response.statusText}`
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <form>
      <label htmlFor="name">Category name:</label>
      <input
        type="text"
        name="name"
        value={category.name}
        onChange={(e) => {
          handleNameChange(e);
        }}
      ></input>
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Add category
      </button>
    </form>
  );
}
