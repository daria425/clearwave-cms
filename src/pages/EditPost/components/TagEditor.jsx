import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CloseButton from "../../PageComponents/Icons/CloseButton";
export default function TagEditor({
  selectedPost,
  handleTagEditor,
  handleNewTag,
}) {
  const [newTag, setNewTag] = useState("");

  return (
    <dialog className="edit-form-tageditor">
      <CloseButton
        closingFunction={handleTagEditor}
        additionalClass="--corner-tageditor"
      />

      <label htmlFor="tags">
        Tags:
        <div className="tags-group-tageditor">
          {selectedPost.tags.map((tag, index) => {
            return (
              <div key={index} className="tag-card--tageditor">
                {tag}
              </div>
            );
          })}
        </div>
      </label>

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
          handleNewTag(newTag);
        }}
      >
        SAVE
      </button>
    </dialog>
  );
}
