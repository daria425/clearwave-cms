import { Link } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../../../App";
import jwtDecode from "jwt-decode";
import { useTokenRefresh } from "../../../Hooks";
export default function BlogCard({ post }) {
  const { handleDelete, accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  async function handleSubmit(e) {
    console.log(e.target.id);
    e.preventDefault();
    // try {
    //   if (accessToken) {
    //     const decodedToken = jwtDecode(accessToken);
    //     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    //     if (decodedToken.exp < currentTime) {
    //       // Access token is expired
    //       // You can handle token refresh or re-authentication here
    //       console.log("Access token is expired. Refreshing...");

    //       const response = await fetch("http://localhost:3000/api/refresh", {
    //         method: "POST",
    //         credentials: "include", // Include credentials (cookies)
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Authorization": `Bearer ${refreshToken}`,
    //           "x-api-key": "svintus2", // Include your API key
    //         },
    //       });
    //       if (response.ok) {
    //         const newToken = await data.json();
    //         console.log(newToken);
    //         updateAccessToken(newToken);
    //         // Perform token refresh or re-authentication and update the access token
    //         // Example: const newAccessToken = await refreshAccessToken();
    //         // updateAccessToken(newAccessToken);

    //         return;
    //       } else {
    //         throw new Error(
    //           `Refresh failed with status code ${response.status}`
    //         );
    //       }
    //     }
    //   }
    // } catch (err) {
    //   console.log(`Error: ${err}`);
    // }

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
      <button>Edit</button>
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
            handleDelete(e);
            handleSubmit(e);
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MjU5ZjFjNWU5M2Y1YWJhYzAwM2E0OSIsInVzZXJuYW1lIjoiZGFyaWEiLCJwYXNzd29yZCI6IiQyYSQxMCRGcFRuSWc1a2sueDU3bnk1cjI4YVplbUdjYWJxdW52ZFNkYS9QNGJiVC5wc0JoWThENi5sNiIsImNvbW1lbnRzIjpbXSwiZW1haWwiOiJkYXJpYW5hdW1vdmE1QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsIl9fdiI6MH0sImlhdCI6MTY5NzI5NTQ5NywiZXhwIjoxNjk3Mjk2Mzk3fQ.Glnbw3StyV8hrL1pDhM3wncUSTFpbg8KYt0RJWV1bZA"
