export default function Modal({ modalMessage }) {
  return (
    <aside className="modal">
      <p className="modal-message">{modalMessage}</p>
    </aside>
  );
}
