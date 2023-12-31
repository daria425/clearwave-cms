export default function DeleteButton({ deletionFunction, imageid, postid }) {
  return (
    <button
      className="btn-danger--delete-image"
      onClick={(e) => {
        deletionFunction(e);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="close-icon"
        id={imageid}
        data-postid={postid}
      >
        <path id={imageid} data-postid={postid} d="M0 0h24v24H0z" fill="none" />
        <path
          id={imageid}
          data-postid={postid}
          fill="currentColor"
          className="close-icon--x-path"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </button>
  );
}
