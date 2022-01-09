function BForm({ formStyles, children }) {
  return (
    <div style={formStyles} className="BForm">
      {children}
    </div>
  );
}

export default BForm;
