export default function Modal({ responseError, handleModal }) {
  return (
    <aside className="modal">
      <h4 className="modal-heading">{responseError ? `Error!` : "Success!"}</h4>
      <p className="modal-text">
        {responseError ? responseError : "Changes saved"}
      </p>
      <button onClick={handleModal}>OK</button>
    </aside>
  );
}
