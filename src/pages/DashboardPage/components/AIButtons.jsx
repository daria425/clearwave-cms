import ChatButton from "./ChatButton";
import { useState } from "react";
import AccordionIcon from "../../PageComponents/Icons/AccordionIcon";
export default function AIButtons({ handleModalFunction }) {
  const [showBtns, setShowBtns] = useState(false);
  const initialStyle = {
    height: "0px",
    overflow: "hidden",
  };
  const secondStyle = {
    height: "100%",
    overflow: "auto",
  };
  function handleShowBtns() {
    setShowBtns(!showBtns);
  }
  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-btns-container">
        <button className="btn-primary--accordion" onClick={handleShowBtns}>
          AI FUNCTIONS
          <AccordionIcon showContent={showBtns} />
        </button>
        <button
          className="btn-primary--questionbtn"
          onClick={() => {
            handleModalFunction;
          }}
        >
          ?
        </button>
      </div>
      <div
        className="dropdown-content-ai-buttons"
        style={showBtns ? secondStyle : initialStyle}
      >
        <ChatButton handlerFunction={() => {}} gptRequest={"CONTENT IDEAS"} />
        <ChatButton
          handlerFunction={() => {}}
          gptRequest={"KEYWORD RESEARCH"}
        />
      </div>
    </div>
  );
}
