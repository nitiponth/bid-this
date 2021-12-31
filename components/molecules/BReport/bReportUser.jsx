import { IoCloseSharp } from "react-icons/io5";

import Backdrop from "../../layout/backdrop";
import BInput from "../../atoms/BInput/bInput";
import BForm from "../../atoms/BForm/bForm";
import BTextarea from "../../atoms/BTextarea/bTextarea";
import BButton from "../../atoms/BButton/bButton";

function BReportUser({ active, onClose, userId, username }) {
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
              inputStyles={{ width: "100%" }}
              required={true}
              resize={"none"}
            />

            <div style={{ margin: "3rem", alignSelf: "center" }}>
              <BButton title="Report" />
            </div>
          </BForm>
        </div>
      </div>
    </Backdrop>
  );
}

export default BReportUser;
