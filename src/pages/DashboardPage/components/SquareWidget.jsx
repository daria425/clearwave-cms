export default function SquareWidget({
  widgetNumber,
  widgetLabel,
  additionalClass = "",
}) {
  return (
    <div className={`square-card${additionalClass}`}>
      <div className="text-wrap">
        <h3 className="square-card-title">{widgetNumber}</h3>
        <p className="square-card-text">{widgetLabel}</p>
      </div>
    </div>
  );
}
