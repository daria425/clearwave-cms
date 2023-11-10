export default function ChatButton({ gptRequest, handlerFunction }) {
  return (
    <button
      className="btn-outline"
      onClick={(e) => {
        handlerFunction(e);
      }}
    >
      {gptRequest}
    </button>
  );
}
