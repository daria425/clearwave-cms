import { useState } from "react";
import CloseButton from "../../PageComponents/Icons/CloseButton";
export default function TagEditor({
  selectedPost,
  handleTagEditor,
  handleTagUpdate,
}) {
  const [newTag, setNewTag] = useState("");
  const [tagsToDelete, setTagsToDelete] = useState([]);

  function stageForDeletion(e) {
    if (!tagsToDelete.includes(e.target.dataset.tagname)) {
      setTagsToDelete([...tagsToDelete, e.target.dataset.tagname]);
    }
  }
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
            const isTagToDelete = tagsToDelete.includes(tag);
            const tagStyle = {
              textDecoration: isTagToDelete ? "line-through" : "none",
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
          handleTagUpdate(newTag, tagsToDelete);
        }}
      >
        SAVE
      </button>
    </dialog>
  );
}
