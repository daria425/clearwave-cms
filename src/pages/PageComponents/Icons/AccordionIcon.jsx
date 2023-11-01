export default function AccordionIcon({ showMainText }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="accordion-icon"
      viewBox="0 -960 960 960"
    >
      <path
        fill="currentColor"
        d={
          showMainText
            ? "M200-440v-80h560v80H200Z"
            : "M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
        }
      ></path>
    </svg>
  );
}
