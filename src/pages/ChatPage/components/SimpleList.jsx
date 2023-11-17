export default function SimpleList({ GPTResponse }) {
  return (
    <ul className="chatbox-message">
      {GPTResponse.map((listitem, index) => (
        <li className="chatbox-text" key={index}>
          {listitem}
        </li>
      ))}
    </ul>
  );
}
