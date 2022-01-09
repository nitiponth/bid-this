function BCheckbox({ isSave, setIsSaveCard, label }) {
  return (
    <div
      className="checkbox"
      style={{
        marginTop: 0,
        padding: 0,
        backgroundColor: "white",
        boxShadow: "none",
      }}
    >
      <label
        className="checkbox__item"
        style={
          ({
            display: "flex",
            alignItems: "center",
            fontSize: "1.4rem",
          },
          !isSave ? { textDecoration: "line-through" } : null)
        }
      >
        <input
          type="checkbox"
          className="checkbox__box"
          defaultChecked={isSave}
          onChange={() => setIsSaveCard((prev) => !prev)}
        />
        {label}
      </label>
    </div>
  );
}

export default BCheckbox;
