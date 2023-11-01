import { useNavigate } from "react-router-dom";
import PostImages from "./PostImages";
import BackButton from "../../PageComponents/Icons/BackButton";
import AccordionIcon from "../../PageComponents/Icons/AccordionIcon";
import { useState } from "react";
export default function PostDetailsCard({ selectedPost }) {
  const [showMainText, setShowMainText] = useState(false);
  const initialStyle = {
    height: "0px",
    overflow: "hidden",
  };
  const secondStyle = {
    height: "25vh",
    overflow: "auto",
  };
  const nav = useNavigate();
  function handleShowMainText() {
    setShowMainText(!showMainText);
  }
  return (
    <>
      <section className="post-details-card">
        <PostImages selectedPost={selectedPost} />
        <h1 className="post-details-card-title">{selectedPost.title}</h1>
        <h3 className="post-details-card-label">Subheading:</h3>
        <p className="post-details-card-content">
          {selectedPost.content.subheading}
        </p>
        <h3 className="post-details-card-label"> Snippets:</h3>
        {selectedPost.content.snippets.length > 0 &&
        selectedPost.content.snippets[0] !== ""
          ? selectedPost.content.snippets.map((snippet, index) => (
              <p className="post-details-card-content" key={index}>
                {snippet}
              </p>
            ))
          : "No snippets"}
        <button className="btn-outline--accordion" onClick={handleShowMainText}>
          VIEW CONTENT
          <AccordionIcon showMainText={showMainText} />
        </button>
        <p
          className="post-details-content--main-text-panel"
          style={showMainText ? secondStyle : initialStyle}
        >
          {selectedPost.content.main_text}
        </p>
        <h3 className="post-details-card-label">Category:</h3>
        <p className="post-details-card-content">
          {selectedPost.category.name}
        </p>
        <h3 className="post-details-card-label">Tags:</h3>
        <ul>
          {selectedPost.tags.map((tag, index) => (
            <li className="post-details-listitem" key={index}>
              {tag}
            </li>
          ))}
        </ul>
      </section>
      <BackButton />
    </>
  );
}
