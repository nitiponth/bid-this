function Checkbox(props) {
  return (
    <div className="checkbox">
      <div className="checkbox__border">
        <div className="checkbox__indicator" />
      </div>
      <div className="checkbox__label">{props.label}</div>
    </div>
  );
}

export default Checkbox;
