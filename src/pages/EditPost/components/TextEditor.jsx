import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { contentContext } from "../../../App";
export default function TextEditor() {
  const { selectedPost, handleNestedTextChange } = useOutletContext();
  const nav = useNavigate();
  if (!selectedPost) {
    return <p>Loading...</p>;
  }
  return (
    <div className="texteditor">
      <h2 className="texteditor-title">{selectedPost.title}</h2>
      <label htmlFor="main_text" className="texteditor-label-main">
        Edit post content:
        <textarea
          className="texteditor-textarea"
          name="content.main_text"
          onChange={(e) => {
            handleNestedTextChange(e);
          }}
          value={selectedPost.content.main_text}
          required
        ></textarea>
      </label>
      <button
        className="btn-primary"
        onClick={() => {
          nav(-1);
        }}
      >
        SAVE AND CLOSE
      </button>
    </div>
  );
}
