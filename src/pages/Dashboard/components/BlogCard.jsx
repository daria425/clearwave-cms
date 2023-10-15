import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../../../App";
import { useTokenRefresh } from "../../../Hooks";
export default function BlogCard({ post }) {
  const navigate = useNavigate();
  const { handleDelete, accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const error = useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  async function handleSubmit(e) {
    console.log(e.target.id);
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/api/posts/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "x-api-key": "svintus", // Include your API key
        },
        body: JSON.stringify({
          postid: e.target.id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div role="article" key={post._id} id={post._id}>
      <h2>Title:{post.title}</h2>
      <p>Category:{post.category.name}</p>
      <p>{post.createdAt}</p>
      <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
      <form>
        <input
          id={post._id}
          className="form-control"
          type="hidden"
          name="postid"
          required={true}
          value={post._id}
        />
        <button
          type="submit"
          id={post._id}
          onClick={(e) => {
            handleSubmit(e);
            handleDelete(e, error);
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MjU5ZjFjNWU5M2Y1YWJhYzAwM2E0OSIsInVzZXJuYW1lIjoiZGFyaWEiLCJwYXNzd29yZCI6IiQyYSQxMCRGcFRuSWc1a2sueDU3bnk1cjI4YVplbUdjYWJxdW52ZFNkYS9QNGJiVC5wc0JoWThENi5sNiIsImNvbW1lbnRzIjpbXSwiZW1haWwiOiJkYXJpYW5hdW1vdmE1QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsIl9fdiI6MH0sImlhdCI6MTY5NzI5NTQ5NywiZXhwIjoxNjk3Mjk2Mzk3fQ.Glnbw3StyV8hrL1pDhM3wncUSTFpbg8KYt0RJWV1bZA"
