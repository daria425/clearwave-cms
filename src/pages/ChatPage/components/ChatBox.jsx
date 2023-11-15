import ChatInterface from "./ChatInterface";
import ChatCommunication from "./ChatCommunication";
export default function ChatBox({
  settings,
  userTheme,
  loading,
  handleThemeChange,
  GPTResponse,
}) {
  return (
    <section className="chatbox">
      <ChatInterface
        settings={settings}
        loading={loading}
        GPTResponse={GPTResponse}
      />

      <ChatCommunication
        userTheme={userTheme}
        handlerFunction={handleThemeChange}
        submitHandler={settings.handlerFunction}
      />
    </section>
  );
}
