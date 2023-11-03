import CloseButton from "../../PageComponents/Icons/CloseButton";
export default function TagEditor({ selectedPost, handleTagEditor }) {
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
    </dialog>
  );
}
