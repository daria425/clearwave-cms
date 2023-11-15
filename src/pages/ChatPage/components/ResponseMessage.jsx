export default function ResponseMessage({ responseMessage }) {
  return (
    <div className="chatbox-message--response">
      <h3 className="chatbot-heading--response">
        Topic: {responseMessage.content_idea}
      </h3>
      <h3>
        <span className="response-label-span">Sample Post Title: </span>
        {responseMessage.title}
      </h3>
      <h3>
        <span className="response-label-span">Idea Summary: </span>
        {responseMessage.summary}
      </h3>
      <p>
        <span className="response-label-span">SEO friendly tags:</span>
        {responseMessage.tags}
      </p>
    </div>
  );
}
