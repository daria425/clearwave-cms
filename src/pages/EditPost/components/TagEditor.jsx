import { useState, useRef } from "react";
import CloseButton from "../../PageComponents/Icons/CloseButton";
import {
  danger,
  gray600,
} from "../../../assets/styles/modules/_variables.module.scss";
export default function TagEditor({
  selectedPost,
  handleTagEditor,
  handleTagUpdate,
}) {
  const [newTag, setNewTag] = useState("");
  const [tagsToDelete, setTagsToDelete] = useState([]);
  const ref = useRef(null);
  function stageForDeletion(e) {
    if (!tagsToDelete.includes(e.target.dataset.tagname)) {
      setTagsToDelete([...tagsToDelete, e.target.dataset.tagname]);
    } else {
      setTagsToDelete(
        tagsToDelete.filter((tag) => tag !== e.target.dataset.tagname)
      ); //removes tag from deleted array on repeat click
    }
  }
  return (
    <aside className="edit-form-tageditor" ref={ref}>
      <CloseButton
        closingFunction={handleTagEditor}
        additionalClass="--corner-tageditor"
      />

      <label htmlFor="tags">
        Tags:
        <div className="tags-group-tageditor">
          {selectedPost.tags.map((tag, index) => {
            const isTagToDelete = tagsToDelete.includes(tag);
            const tagStyle = isTagToDelete
              ? {
                  textDecoration: "line-through",
                  backgroundColor: danger,
                }
              : {
                  textDecoration: "none",
                  backgroundColor: gray600,
                };
            return (
              <div
                data-tagname={tag}
                onClick={(e) => {
                  stageForDeletion(e);
                }}
                key={index}
                className="tag-card--tageditor"
                style={tagStyle}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </label>
      {/* to do: prevent duplicate tag submission */}
      <label htmlFor="new-tag">New Tag:</label>
      <input
        type="text"
        name="new-tag"
        id="new-tag"
        className="tag-input-tageditor"
        value={newTag}
        onChange={(e) => {
          setNewTag(e.target.value);
        }}
      ></input>
      <button
        className="btn-primary"
        onClick={(e) => {
          e.preventDefault();
          ref.current?.scrollIntoView();
          handleTagUpdate(newTag, tagsToDelete);
          handleTagEditor(e);
        }}
      >
        SAVE
      </button>
    </aside>
  );
}
