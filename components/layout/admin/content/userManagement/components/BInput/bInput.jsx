function BInput({
  label,
  id,
  type,
  onChange,
  value,
  placeholder,
  disabled,
  inputProps,
  inputStyles,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label htmlFor={id} className="BLabel">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className="BInput"
        {...inputProps}
        style={{ ...inputStyles }}
      />
    </div>
  );
}

export default BInput;
