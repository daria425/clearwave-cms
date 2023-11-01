import { Buffer } from "buffer";
import { useContext } from "react";
import { appContext, contentContext } from "../../../App";
import DeleteButton from "../../PageComponents/Icons/DeleteButton";
export default function PostImages({ selectedPost }) {
  const { accessToken } = useContext(appContext);
  const { syncImageDelete } = useContext(contentContext);
  async function handleServerImageDelete(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${selectedPost._id}/imagedelete`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "x-api-key": "svintus", // Include  API key
          },
          body: JSON.stringify({ "image_to_delete": e.target.id }),
        }
      );
      if (response.ok) {
        syncImageDelete(e); //deletes image on selected post AND in the allBlogs
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
        <div className="post-details-gallery">
          {selectedPost.image_sources.map((image, index) => (
            <div key={index} className="post-details-galleryitem">
              <div className="post-details-imagecontainer">
                <img
                  className="post-details-imagecontainer-img"
                  src={`data:image/${image.contentType};base64, ${Buffer.from(
                    image.data
                  ).toString("base64")}`}
                  alt={`Image ${index + 1}`}
                />
              </div>
              <DeleteButton deletionFunction={handleServerImageDelete} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
