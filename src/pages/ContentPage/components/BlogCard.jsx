import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { appContext, contentContext } from "../../../App";
import { format, parseISO } from "date-fns";
import { useTokenRefresh } from "../../../helpers/Hooks";
import CloseButton from "../../PageComponents/Icons/CloseButton";
import DeletePostButton from "../../PageComponents/Icons/DeletePostButton";
export default function BlogCard({
  post,
  handleSelection,
  handleUndoSelection,
}) {
  const navigate = useNavigate();
  const { accessToken, updateAccessToken, refreshToken } =
    useContext(appContext);
  const { handleDelete } = useContext(contentContext);
  useTokenRefresh(accessToken, updateAccessToken, refreshToken);
  const [error, setError] = useState(null);
  const initialStyle = {
    border: "none",
    zIndex: "0",
  };
  const selectedStyle = {
    border: "2px solid #999999",
    zIndex: "5",
  };
  const [cardSelected, setCardSelected] = useState(false);
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
  function selectCard() {
    setCardSelected(true);
    handleSelection();
  }

  function undoSelectCard(e) {
    e.stopPropagation();
    setCardSelected(false);
    handleUndoSelection();
  }
  return (
    <div
      role="article"
      className="post-card"
      key={post._id}
      id={post._id}
      style={cardSelected ? selectedStyle : initialStyle}
      onClick={selectCard}
    >
      {cardSelected && (
        <CloseButton
          closingFunction={undoSelectCard}
          additionalClass="--corner-post-card"
        />
      )}
      <h2 className="post-card-title">Title: {post.title}</h2>
      <p className="post-card-category">Category: {post.category.name}</p>
      <p className="post-card-date">
        Date posted:{format(parseISO(post.createdAt), "MM/dd/yyyy")}
      </p>
      <div className="post-control-buttons">
        <button
          className="btn-outline"
          onClick={() => navigate(`/${post._id}/edit`)}
        >
          EDIT
        </button>
        <DeletePostButton deletionFunction={handleSubmit} postid={post._id} />
      </div>
    </div>
  );
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MjU5ZjFjNWU5M2Y1YWJhYzAwM2E0OSIsInVzZXJuYW1lIjoiZGFyaWEiLCJwYXNzd29yZCI6IiQyYSQxMCRGcFRuSWc1a2sueDU3bnk1cjI4YVplbUdjYWJxdW52ZFNkYS9QNGJiVC5wc0JoWThENi5sNiIsImNvbW1lbnRzIjpbXSwiZW1haWwiOiJkYXJpYW5hdW1vdmE1QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsIl9fdiI6MH0sImlhdCI6MTY5NzI5NTQ5NywiZXhwIjoxNjk3Mjk2Mzk3fQ.Glnbw3StyV8hrL1pDhM3wncUSTFpbg8KYt0RJWV1bZA"
