import StatusBadge from "./statusBadge";

function ReportList({ title, id, image, status, type, onCheck, date }) {
  return (
    <div className="reportRow">
      <div className="reportRow__list">
        <img
          src={
            image ||
            "https://bid-this-storage.s3.ap-southeast-1.amazonaws.com/profile/no-profile-2.png"
          }
          alt="profile"
          className="reportRow__list__image"
        />
        <div className="reportRow__list__detail">
          <div style={{ fontSize: "1.6rem", color: "#333" }}>{title}</div>
          <div style={{ fontSize: "1.3rem", color: "#999" }}>{id}</div>
        </div>
      </div>
      <div className="reportRow__type">
        <div style={{ fontSize: "1.6rem", color: "#666" }}>{type}</div>
      </div>
      <div className="reportRow__status">
        <StatusBadge status={status} />
      </div>
      <div className="reportRow__date">
        {new Date(date).toLocaleDateString("EN-us")}
      </div>
      <div className="reportRow__button" onClick={onCheck}>
        Check
      </div>
    </div>
  );
}

export default ReportList;
