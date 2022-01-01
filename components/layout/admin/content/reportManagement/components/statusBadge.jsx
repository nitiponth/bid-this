import { useEffect } from "react";

const STATUS_TYPE = {
  received: "RECEIVED",
  checking: "CHECKING",
  done: "DONE",
};

function StatusBadge({ status }) {
  let badgeText = "RECEIVED";
  let badgeColor = "#747b8a";
  //   useEffect(() => {

  //   }, [status]);

  if (status === STATUS_TYPE.received) {
    badgeText = "RECEIVED";
    badgeColor = "#747b8a";
  } else if (status === STATUS_TYPE.checking) {
    badgeText = "CHECKING";
    badgeColor = "#fab325";
  } else if (status === STATUS_TYPE.done) {
    badgeText = "DONE";
    badgeColor = "#66bb6a";
  } else {
    badgeText = "ERROR";
    badgeColor = "#F05454";
  }
  return (
    <div
      style={{
        width: 80,
        minHeight: 22,
        backgroundColor: badgeColor,
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          fontSize: "1.3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
          padding: "0.3rem 1rem",
        }}
      >
        {badgeText}
      </div>
    </div>
  );
}

export default StatusBadge;
