import ResponseMessage from "./ResponseMessage";

export default function ResponseList({ GPTresponse }) {
  return (
    <ul className="response-messagelist">
      {GPTresponse.map((responseObject, index) => (
        <ResponseMessage key={index} responseMessage={responseObject} />
      ))}
    </ul>
  );
}
