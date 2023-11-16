export default function ChatCommunication({
  userTheme,
  handlerFunction,
  submitHandler,
  handleSendMessage,
  endpoint,
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
          handleSendMessage(userTheme);
          submitHandler(e, endpoint);
        }}
      >
        GENERATE
      </button>
    </form>
  );
}
