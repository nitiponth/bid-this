import { FaSearch, FaUserAlt } from "react-icons/fa";

function UserData({ data }) {
  // console.log(data);

  const name = data.name.first + " " + data.name.last;

  let status = "null";
  if (data) {
    if (data.status === "GUEST") {
      status = "Guest";
    }
    if (data.status === "AUTHEN") {
      status = "Confirm by Email";
    }
    if (data.status === "FULLAUTHEN") {
      status = "KYC Complete";
    }
    if (data.status === "BANNED") {
      status = "Banned";
    }
  }
  return (
    <div className="userDataContainer">
      <div className="left">
        <img
          className="left__profile"
          src={
            data.profile ||
            "https://bid-this-storage.s3.ap-southeast-1.amazonaws.com/profile/no-profile-2.png"
          }
        />
      </div>
      <div className="body">
        <div className="body__userId">{data.id}</div>
        <div className="body__name">🧑‍🤝‍🧑 {name}</div>
        <div className="body__email">📧 {data.email}</div>
      </div>
      <div className="verification">
        <div className="verification__label">KYC Verification</div>
        <div className="verification__idCard">
          💳 <span>{data.kyc.idCard ? "✔️" : "❌"}</span>
        </div>
        <div className="verification__photo">
          🤳 <span>{data.kyc.photo ? "✔️" : "❌"}</span>
        </div>
        <div className="verification__status">
          📜 <span style={{ marginLeft: "5px" }}>{status}</span>
        </div>
      </div>
      <div className="buttonGroup">
        <div className="buttonGroup__btn">
          <FaSearch />
        </div>
        <div className="buttonGroup__btn">
          <FaUserAlt />
        </div>
      </div>
    </div>
  );
}

export default UserData;
