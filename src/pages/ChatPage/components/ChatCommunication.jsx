export default function ChatCommunication({
  userTheme,
  handlerFunction,
  submitHandler,
}) {
  return (
    <form className="chatbox-inputarea">
      <label htmlFor="theme"></label>
      <input
        type="text"
        name="theme"
        id="theme"
        className="chatbox-input"
        value={userTheme}
        onChange={(e) => {
          handlerFunction(e);
        }}
      ></input>
      <button
        className="btn-primary"
        onClick={(e) => {
          submitHandler(e);
        }}
      >
        GENERATE
      </button>
    </form>
  );
}
