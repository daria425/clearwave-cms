import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { appContext, contentContext } from "../../../App";
import { format, parseISO } from "date-fns";
import { useTokenRefresh } from "../../../helpers/Hooks";
export default function BlogCard({ post }) {
  const navigate = useNavigate();
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const { handleDelete } = useContext(contentContext);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  const [error, setError] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/posts/delete", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "x-api-key": "svintus", // Include your API key
        },
        body: JSON.stringify({
          postid: e.target.id,
        }),
      });
      if (response.ok) {
        handleDelete(e);
      } else {
        throw new Error(
          `Server response failed with status code: ${response.statusText}`
        );
      }
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div role="article" className="post-card" key={post._id} id={post._id}>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <h2 className="post-card-title">Title: {post.title}</h2>
          <p className="post-card-category">Category: {post.category.name}</p>
          <p className="post-card-date">
            Date posted:{format(parseISO(post.createdAt), "MM/dd/yyyy")}
          </p>
          <button className="" onClick={() => navigate(`/edit/${post._id}`)}>
            Edit &rarr;
          </button>
          <button
            className="btn"
            type="submit"
            id={post._id}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            X
          </button>
        </>
      )}
    </div>
  );
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MjU5ZjFjNWU5M2Y1YWJhYzAwM2E0OSIsInVzZXJuYW1lIjoiZGFyaWEiLCJwYXNzd29yZCI6IiQyYSQxMCRGcFRuSWc1a2sueDU3bnk1cjI4YVplbUdjYWJxdW52ZFNkYS9QNGJiVC5wc0JoWThENi5sNiIsImNvbW1lbnRzIjpbXSwiZW1haWwiOiJkYXJpYW5hdW1vdmE1QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsIl9fdiI6MH0sImlhdCI6MTY5NzI5NTQ5NywiZXhwIjoxNjk3Mjk2Mzk3fQ.Glnbw3StyV8hrL1pDhM3wncUSTFpbg8KYt0RJWV1bZA"
