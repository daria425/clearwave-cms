import { Buffer } from "buffer";
export default function PostImages({ selectedPost }) {
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
          </div>
        ))
      )}
    </>
  );
}
