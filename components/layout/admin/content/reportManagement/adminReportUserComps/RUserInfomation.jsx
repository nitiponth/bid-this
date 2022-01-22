import { toPhoneNumber } from "../../../../../../utils/stringFormat";
import BForm from "../../../../../atoms/BForm/bForm";
import BInput from "../../../../../atoms/BInput/bInput";
import BTextarea from "../../../../../atoms/BTextarea/bTextarea";

function RUserInfomation({ user, reportMsg }) {
  const { id, name, phone, username, join, email } = user;

  const joinedDate = new Date(join);
  return (
    <div className="RUser__info">
      <div className="RUser__info__label">
        User Information
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
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <BInput
              disabled={true}
              label={"Name"}
              value={name.first + " " + name.last}
              inputStyles={{ marginBottom: "2rem", width: "90%" }}
            />
            <BInput
              disabled={true}
              label={"Username"}
              value={username}
              inputStyles={{ marginBottom: "2rem", width: "90%" }}
            />
            <BInput
              disabled={true}
              label={"Joined"}
              value={joinedDate.toLocaleString("default", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              inputStyles={{ marginBottom: "2rem", width: "95%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <BInput
              disabled={true}
              label={"Email"}
              value={email}
              inputStyles={{ marginBottom: "2rem", width: "95%" }}
            />
            <BInput
              disabled={true}
              label={"Contact Number"}
              value={toPhoneNumber(phone)}
              inputStyles={{
                marginBottom: "2rem",
                width: "60%",
                minWidth: "130px",
                textOverflow: "unset",
              }}
            />
          </div>
        </div>
        <BTextarea
          label={"Report message"}
          disabled={true}
          value={reportMsg}
          inputStyles={{
            width: "100%",
            color: "#777",
            height: "90px",
          }}
          resize={"none"}
        />
      </BForm>
    </div>
  );
}

export default RUserInfomation;
