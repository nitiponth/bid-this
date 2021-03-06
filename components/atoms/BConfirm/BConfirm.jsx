import Backdrop from "../../layout/backdrop";

function BConfirm({
  active,
  onClose,
  onConfirm,
  title,
  body,
  confirmOnly,
  confirmText,
}) {
  return (
    <Backdrop show={active} onClose={onClose}>
      <div className="BConfirm">
        <div className="BConfirm__title">{title}</div>
        <div className="BConfirm__subtitle">{body}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {!confirmOnly && (
            <div onClick={onClose} className="BConfirm__cancel">
              Cancel
            </div>
          )}
          <div onClick={onConfirm} className="BConfirm__confirm">
            {confirmText || "Confirm"}
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

export default BConfirm;
