function BForm(props) {
  const { formStyles } = props;
  return (
    <div style={formStyles} className="BForm">
      {props.children}
    </div>
  );
}

export default BForm;
