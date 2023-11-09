export default function ChatButton({ theme = ["Finance"], handlerFunction }) {
  return (
    <button
      className="btn-outline"
      onClick={(e) => {
        handlerFunction(e);
      }}
    >
      Call GPT!
    </button>
  );
}
