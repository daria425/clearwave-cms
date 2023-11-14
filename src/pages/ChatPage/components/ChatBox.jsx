import ChatInterface from "./ChatInterface";
import ChatCommunication from "./ChatCommunication";
export default function ChatBox({ settings, userTheme, handleThemeChange }) {
  return (
    <section className="chatbox">
      <ChatInterface settings={settings} />
      <ChatCommunication />
    </section>
  );
}
