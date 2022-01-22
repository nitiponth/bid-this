import BForm from "../../../../../atoms/BForm/bForm";
import BInput from "../../../../../atoms/BInput/bInput";

function RUserReportBy({ reportBy, reportedAt }) {
  const { id, username, status } = reportBy;
  return (
    <div className="RUser__info">
      <div className="RUser__info__label">
        Report By
        <span
          style={{
            fontSize: "1.2rem",
            marginLeft: "1rem",
            color: "#aaa",
          }}
        >
          {`(User ID: ${id})`}
        </span>
      </div>
      <BForm>
        {/* left */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <BInput
              disabled={true}
              label={"Username"}
              value={username}
              inputStyles={{ marginBottom: "2rem", width: "90%" }}
            />
          </div>
          {/* right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <BInput
              disabled={true}
              label={"Authentication"}
              value={status}
              inputStyles={{ marginBottom: "2rem", width: "70%" }}
            />
          </div>
          <BInput
            disabled={true}
            label={"Reported at"}
            value={reportedAt}
            inputStyles={{
              marginBottom: "2rem",
              width: "75%",
              textOverflow: "unset",
            }}
          />
        </div>
      </BForm>
    </div>
  );
}

export default RUserReportBy;
