import EditForm from "./EditPostForm";
import PostDetails from "./PostDetails";
import Modal from "./Modal";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import TagEditor from "./TagEditor";
import Overlay from "../../PageComponents/Overlay";
export default function SummaryView() {
  const {
    selectedPost,
    responseLoading,
    handleArrayChange,
    handleChange,
    handleCheckbox,
    handleDataUpdate,
    handleNestedTextChange,
    handleResponse,
    handleSelectChange,
    handleNestedArrayChange,
  } = useOutletContext();
  const [openTagEditor, setOpenTagEditor] = useState(false);
  if (!selectedPost) {
    return <p>Loading...</p>;
  }
  function handleTagEditor(e) {
    e.preventDefault();
    setOpenTagEditor(!openTagEditor);
  }
  return (
    <div className="summary-view-wrapper">
      {openTagEditor && <TagEditor selectedPost={selectedPost} />}
      {responseLoading && <Modal modalMessage="Loading" />}
      <PostDetails selectedPost={selectedPost} />
      <EditForm
        handleDataUpdate={handleDataUpdate}
        handleResponse={handleResponse}
        selectedPost={selectedPost}
        handleChange={handleChange}
        handleNestedArrayChange={handleNestedArrayChange}
        handleSelectChange={handleSelectChange}
        handleNestedTextChange={handleNestedTextChange}
        handleCheckbox={handleCheckbox}
        handleArrayChange={handleArrayChange}
        handleTagEditor={handleTagEditor}
      />
      {openTagEditor ? <Overlay /> : null}
    </div>
  );
}
