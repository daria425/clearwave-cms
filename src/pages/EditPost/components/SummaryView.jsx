import EditForm from "./EditPostForm";
import PostDetails from "./PostDetails";
import Modal from "./Modal";
import { useParams, useOutletContext } from "react-router-dom";
import { useContext, useEffect } from "react";
import { contentContext } from "../../../App";
import { useState } from "react";
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

  if (!selectedPost) {
    return <p>Loading...</p>;
  }
  return (
    <div className="summary-view-wrapper">
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
      />
    </div>
  );
}
