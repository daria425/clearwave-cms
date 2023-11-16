export default function SimpleList({ GPTResponse }) {
  return (
    <ul>
      {GPTResponse.map((listitem, index) => (
        <li key={index}>{listitem}</li>
      ))}
    </ul>
  );
}
