function Key({ text, down }) {
  return (
    <div className={`Key down-${down}`}>
      <div className="letter-container">{text}</div>
      <div className="letter-floor"> </div>
    </div>
  );
}

export default Key;
