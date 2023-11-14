export default function ChatInterface({ settings }) {
  return (
    <div className="chatbox-chatinterface">
      <div className="chatbox-message">
        <h3 className="chatbox-text chatbot-heading">{settings.heading}</h3>
        <p className="chatbox-text">{settings.instructions}</p>
      </div>
    </div>
  );
}
