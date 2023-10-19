import { Buffer } from "buffer";
import { useContext } from "react";
import { appContext } from "../../../App";
export default function PostImages({ selectedPost, handleImageDelete }) {
  const { accessToken } = useContext(appContext);
  async function handleServerImageDelete(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/imgdelete`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            // "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`,
            "x-api-key": "svintus", // Include  API key
          },
          body: e.target.id,
        }
      );
      console.log(response);
      if (response.ok) {
        handleImageDelete(e); //if image is deleted on server THEN delete it on the client
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {selectedPost.image_sources.length <= 0 ? (
        <p>No images</p>
      ) : (
        selectedPost.image_sources.map((image, index) => (
          <div key={index} className="imageContainer">
            <img
              className="imageContainer-img"
              key={index}
              src={`data:image/${image.contentType};base64, ${Buffer.from(
                image.data
              ).toString("base64")}`}
              alt={`Image ${index + 1}`}
            />
            <button
              onClick={(e) => {
                handleServerImageDelete(e);
              }}
              id={image._id}
            >
              Remove image
            </button>
          </div>
        ))
      )}
    </>
  );
}
