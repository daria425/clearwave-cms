import Loader from "../../PageComponents/Loader";
import ResponseList from "./ResponseList";
export default function ChatInterface({ settings, loading, GPTResponse }) {
  return (
    <div className="chatbox-chatinterface">
      <div className="chatbox-message">
        <h3 className="chatbox-text chatbot-heading">{settings.heading}</h3>
        <p className="chatbox-text">{settings.instructions}</p>
      </div>
      {GPTResponse && <ResponseList GPTresponse={GPTResponse} />}
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </div>
  );
}
