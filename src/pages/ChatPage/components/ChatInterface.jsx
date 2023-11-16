import Loader from "../../PageComponents/Loader";
import ResponseList from "./ResponseList";
import UserMessage from "./UserMessage";

export default function ChatInterface({
  settings,
  loading,
  GPTResponse,
  message,
}) {
  const initialStyle = {
    position: "static",
    left: 0,
  };
  const removedStyle = {
    position: "absolute",
    left: "-9999px",
  };
  return (
    <div className="chatbox-chatinterface">
      <div
        className="chatbox-message"
        style={message ? removedStyle : initialStyle}
      >
        <h3 className="chatbox-text chatbot-heading">{settings.heading}</h3>
        <p className="chatbox-text">{settings.instructions}</p>
      </div>
      {message && <UserMessage message={message} />}
      {GPTResponse && <ResponseList GPTresponse={GPTResponse} />}
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </div>
  );
}
