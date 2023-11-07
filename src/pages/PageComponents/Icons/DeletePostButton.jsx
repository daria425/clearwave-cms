export default function DeletePostButton({ deletionFunction, postid }) {
  return (
    <button
      id={postid}
      className="btn-danger--delete-post"
      onClick={(e) => {
        deletionFunction(e);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="close-icon"
        id={postid}
      >
        <path id={postid} d="M0 0h24v24H0z" fill="none" />
        <path
          id={postid}
          fill="currentColor"
          className="close-icon--x-path"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </button>
  );
}
