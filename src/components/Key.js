const classNames = require("classnames");

function Key({ text, down, size, last }) {
  const renderLightRay = () => {
    if (down) return <div className="light-ray" />;
  };
  return (
    <div className={classNames("Key", { down, last })} style={{ flex: size }}>
      {/* {renderLightRay()} */}
      <div className="letter-container">{text}</div>
      <div className="letter-floor"> </div>
    </div>
  );
}

export default Key;
