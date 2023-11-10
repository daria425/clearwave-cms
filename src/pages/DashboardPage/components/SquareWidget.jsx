export default function SquareWidget({ widgetTitle, widgetContent }) {
  return (
    <div className="square-card">
      <h3 className="square-card-title">{widgetTitle}</h3>
      <p className="square-card-text">{widgetContent}</p>
    </div>
  );
}
