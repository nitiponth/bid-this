function BButton({ title, disabled, containerStyles, onClick }) {
  let styles = "BButton";

  if (disabled) {
    styles = "BButton BButton--disabled";
  }

  return (
    <div
      className={styles}
      style={containerStyles}
      onClick={() => {
        if (disabled) return;

        onClick();
      }}
    >
      {title}
    </div>
  );
}

export default BButton;
