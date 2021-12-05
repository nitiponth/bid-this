function BButton({ title, disabled, containerStyles, onClick }) {
  let styles = "BButton BButton--disabled";
  if (disabled) {
    styles = "BButton";
  }

  return (
    <div
      className={styles}
      style={containerStyles}
      onClick={() => {
        if (!disabled) return;

        onClick();
      }}
    >
      {title}
    </div>
  );
}

export default BButton;
