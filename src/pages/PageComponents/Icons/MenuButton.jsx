export default function MenuButton({ handleSidebarOpen }) {
  return (
    <button className="btn-icon" onClick={handleSidebarOpen}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        className="menu-icon"
      >
        <path
          fill="currentColor"
          d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
        />
      </svg>
    </button>
  );
}
