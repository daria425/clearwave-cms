export default function TagEditor({ selectedPost }) {
  return (
    <dialog className="edit-form-tageditor">
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
