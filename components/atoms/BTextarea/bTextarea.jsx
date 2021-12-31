function BTextarea({
  label,
  id,
  type,
  onChange,
  value,
  rows = 10,
  placeholder,
  disabled,
  required,
  inputProps,
  inputStyles,
  resize,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label htmlFor={id} className="BLabel">
        {label}
      </label>
      <textarea
        rows={rows}
        onChange={onChange}
        value={value}
        className="BTextarea"
        placeholder={placeholder}
        spellCheck="false"
        required={required}
        {...inputProps}
        style={{ ...inputStyles, resize: resize }}
      />
    </div>
  );
}

export default BTextarea;
