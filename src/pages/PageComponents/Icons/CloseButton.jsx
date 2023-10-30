export default function CloseButton({ handleSidebarClose }) {
  return (
    <button className="btn-icon-dark" onClick={handleSidebarClose}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="close-icon"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          fill="currentColor"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </button>
  );
}
