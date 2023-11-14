export default function ChatCommunication() {
  return (
    <div className="chatbox-inputarea">
      <label htmlFor="theme"></label>
      <input
        type="text"
        name="theme"
        id="theme"
        className="chatbox-input"
      ></input>
      <button className="btn-primary">GENERATE STRATEGY</button>
    </div>
  );
}
