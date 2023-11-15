export default function ResponseMessage({ responseMessage }) {
  return (
    <div className="chatbox-message--response">
      <h3 className="chatbot-heading">Topic: {responseMessage.content_idea}</h3>
      <h3>{responseMessage.title}</h3>
      <h3>{responseMessage.summary}</h3>
      <p>
        <span>SEO friendly tags:</span> {responseMessage.tags}
      </p>
    </div>
  );
}
