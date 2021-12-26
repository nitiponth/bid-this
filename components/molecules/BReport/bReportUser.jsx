import Backdrop from "../../layout/backdrop";

function BReportUser({ active, onClose }) {
  return (
    <Backdrop show={active} onClose={onClose}>
      <div className="BReport">
        <div className="BReport__title">User Reporsdsdt 📣</div>
      </div>
    </Backdrop>
  );
}

export default BReportUser;
