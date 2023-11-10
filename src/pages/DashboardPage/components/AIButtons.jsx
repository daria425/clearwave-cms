import ChatButton from "./ChatButton";
import { useState } from "react";
import AccordionIcon from "../../PageComponents/Icons/AccordionIcon";
export default function AIButtons({ handlerFunction }) {
  const [showBtns, setShowBtns] = useState(false);
  const initialStyle = {
    height: "0px",
    overflow: "hidden",
  };
  const secondStyle = {
    height: "25vh",
    overflow: "auto",
  };
  function handleShowBtns() {
    setShowBtns(!showBtns);
  }
  return (
    <div className="dropdown-wrapper">
      <button className="btn-primary--accordion" onClick={handleShowBtns}>
        AI FUNCTIONS
        <AccordionIcon showContent={showBtns} />
      </button>
      <div
        className="dropdown-content-ai-buttons"
        style={showBtns ? secondStyle : initialStyle}
      >
        <ChatButton
          handlerFunction={handlerFunction}
          gptRequest={"CONTENT IDEAS"}
        />
        <ChatButton
          handlerFunction={() => {}}
          gptRequest={"KEYWORD RESEARCH"}
        />
      </div>
    </div>
  );
}
