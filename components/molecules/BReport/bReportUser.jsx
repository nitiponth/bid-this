import { IoCloseSharp } from "react-icons/io5";

import Backdrop from "../../layout/backdrop";
import BInput from "../../atoms/BInput/bInput";
import BForm from "../../atoms/BForm/bForm";
import BTextarea from "../../atoms/BTextarea/bTextarea";
import BButton from "../../atoms/BButton/bButton";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const REPORT_USER = gql`
  mutation ($userId: String!, $body: String!) {
    reportUser(userId: $userId, body: $body)
  }
`;

function BReportUser({ active, onClose, userId, username }) {
  const [reportData, setReportData] = useState("");

  const [reportUser] = useMutation(REPORT_USER);

  const reportUserHandler = async () => {
    //validation
    if (reportData.trim() === "" || !userId) {
      return;
    }

    //send Pid and data to backend
    const { data, errors } = await reportUser({
      variables: {
        userId: userId,
        body: reportData,
      },
    });

    if (data) {
      console.log(data.reportUser);
      setReportData("");
      onClose();
    } else if (errors) {
      setReportData("");
      console.error(errors);
    }
  };

  return (
    <Backdrop show={active} onClose={onClose}>
      <div className="BReport" style={{ position: "relative" }}>
        <div
          className="close-btn"
          style={{
            fontSize: "2rem",
            position: "absolute",
            top: 20,
            right: 20,
          }}
          onClick={onClose}
        >
          <IoCloseSharp />
        </div>

        <div className="BReport__title">User Report</div>
        <div className="BReport__body">
          <BForm>
            <BInput
              disabled={true}
              label={"User Id"}
              value={userId}
              inputStyles={{ width: "70%" }}
            />
            <BInput
              disabled={true}
              label={"Username"}
              value={username}
              inputStyles={{ width: "60%" }}
            />
            <div style={{ marginTop: "2rem" }} />
            <BTextarea
              label={"Report Infomation"}
              rows={8}
              placeholder={
                "Please fill out the information to inform the administrator."
              }
              onChange={(e) => {
                setReportData(e.target.value);
              }}
              value={reportData}
              inputStyles={{ width: "100%" }}
              required={true}
              resize={"none"}
            />

            <div style={{ margin: "3rem", alignSelf: "center" }}>
              <BButton
                title="Report"
                disabled={reportData.trim() === ""}
                onClick={reportUserHandler}
              />
            </div>
          </BForm>
        </div>
      </div>
    </Backdrop>
  );
}

export default BReportUser;
