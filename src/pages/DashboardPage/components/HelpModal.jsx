import CloseButton from "../../PageComponents/Icons/CloseButton";
export default function HelpModal({ modalText, handleModal }) {
  return (
    <div className="modal--ai-help">
      <CloseButton closingFunction={handleModal} additionalClass="--ai-help" />
      <h2 className="modal--ai-help-title">{modalText.heading}</h2>
      <p className="modal--ai-help-body">{modalText.body}</p>
      <ul className="modal--ai-help-body">
        {modalText.list.map((listitem, index) => (
          <li key={index}>
            <p className="ai-functionality-name">
              {listitem.heading}:
              <span className="ai-functionality-description">
                {listitem.body}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
