export default function ChatButton({
  gptRequest,
  feature,
  navigationFunction,
}) {
  return (
    <button
      className="btn-outline"
      onClick={() => {
        navigationFunction(feature);
      }}
    >
      {gptRequest}
    </button>
  );
}
