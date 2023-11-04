import { useState } from "react";
import CloseButton from "../../PageComponents/Icons/CloseButton";
export default function TagEditor({
  selectedPost,
  handleTagEditor,
  handleNewTag,
  handleDeleteTags,
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
            return (
              <div
                data-tagname={tag}
                onClick={(e) => {
                  stageForDeletion(e);
                }}
                key={index}
                className="tag-card--tageditor"
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
          handleNewTag(newTag);
          handleDeleteTags(tagsToDelete);
        }}
      >
        SAVE
      </button>
    </dialog>
  );
}
