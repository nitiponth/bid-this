import { IoCloseSharp } from "react-icons/io5";

import Backdrop from "../../layout/backdrop";
import BInput from "../../atoms/BInput/bInput";
import BForm from "../../atoms/BForm/bForm";
import BTextarea from "../../atoms/BTextarea/bTextarea";
import BButton from "../../atoms/BButton/bButton";
import { useState } from "react";

function bReportProduct({ active, onClose, productId, productTitle, seller }) {
  const [reportData, setReportData] = useState("");

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

        <div className="BReport__title">Product Report</div>
        <div className="BReport__body">
          <BForm>
            <BInput
              disabled={true}
              label={"Product Id"}
              value={productId}
              inputStyles={{ width: "70%" }}
            />
            <BInput
              disabled={true}
              label={"Title"}
              value={productTitle}
              inputStyles={{ width: "60%" }}
            />
            <BInput
              disabled={true}
              label={"Seller"}
              value={seller}
              inputStyles={{ width: "50%" }}
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
                onClick={() => {
                  //send Pid and data to backend
                  console.log("report send: ", productId, reportData.trim());

                  //clear modal
                  setReportData("");
                  onClose();
                }}
              />
            </div>
          </BForm>
        </div>
      </div>
    </Backdrop>
  );
}

export default bReportProduct;
