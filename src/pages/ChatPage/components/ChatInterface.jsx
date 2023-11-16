import Loader from "../../PageComponents/Loader";
import ResponseList from "./ResponseList";
import UserMessage from "./UserMessage";
import SimpleList from "../SimpleList";
import { useParams } from "react-router-dom";
export default function ChatInterface({
  settings,
  loading,
  GPTResponse,
  message,
}) {
  const { feature } = useParams();
  console.log(feature);
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
      {GPTResponse && (
        <>
          {feature === "content_strategy" && (
            <ResponseList GPTresponse={GPTResponse} />
          )}
          {feature === "keyword_research" && (
            <SimpleList GPTResponse={GPTResponse} />
          )}
        </>
      )}
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </div>
  );
}
