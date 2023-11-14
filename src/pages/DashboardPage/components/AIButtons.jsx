import ChatButton from "./ChatButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccordionIcon from "../../PageComponents/Icons/AccordionIcon";
export default function AIButtons({ handleModalFunction }) {
  const [showBtns, setShowBtns] = useState(false);
  const nav = useNavigate();
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

  function chatNavigation(feature) {
    nav(`/chat/${feature}`);
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
          onClick={handleModalFunction}
        >
          ?
        </button>
      </div>
      <div
        className="dropdown-content-ai-buttons"
        style={showBtns ? secondStyle : initialStyle}
      >
        <ChatButton
          navigationFunction={chatNavigation}
          feature="content-ideas"
          gptRequest={"CONTENT IDEAS"}
        />
        <ChatButton
          navigationFunction={chatNavigation}
          gptRequest={"KEYWORD RESEARCH"}
          feature="keyword-research"
        />
      </div>
    </div>
  );
}
