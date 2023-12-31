import ChatInterface from "./ChatInterface";
import ChatCommunication from "./ChatCommunication";
export default function ChatBox({
  settings,
  userTheme,
  loading,
  handleThemeChange,
  GPTResponse,
  message,
  handleSendMessage,
  submitHandler,
}) {
  return (
    <section className="chatbox">
      <ChatInterface
        settings={settings}
        loading={loading}
        GPTResponse={GPTResponse}
        message={message}
      />

      <ChatCommunication
        userTheme={userTheme}
        handlerFunction={handleThemeChange}
        submitHandler={submitHandler}
        handleSendMessage={handleSendMessage}
        endpoint={settings.endpoint}
      />
    </section>
  );
}
