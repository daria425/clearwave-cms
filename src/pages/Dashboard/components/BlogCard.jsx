import { Link } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../../../App";
export default function BlogCard({ post }) {
  const { handleDelete } = useContext(appContext);
  return (
    <div role="article" key={post._id} id={post._id}>
      <h2>Title:{post.title}</h2>
      <p>Category:{post.category.name}</p>
      <p>{post.createdAt}</p>
      <button>Edit</button>
      <button
        id={post._id}
        onClick={(e) => {
          handleDelete(e);
        }}
      >
        Delete
      </button>
    </div>
  );
}
