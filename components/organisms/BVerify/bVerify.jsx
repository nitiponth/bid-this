import Backdrop from "../../layout/backdrop";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";
function BVerify({ active, onClose }) {
  const [otpValue, setOtpValue] = useState("");
  const [canVerify, setCanVerify] = useState(false);

  useEffect(() => {
    if (otpValue.length === 6) {
      setCanVerify(true);
    } else {
      setCanVerify(false);
    }
  }, [otpValue]);

  const onChangeHandler = (otp) => {
    setOtpValue(otp);
  };

  const verifyOtpHandler = () => {
    if (otpValue.length < 6) {
      return;
    }
    console.log("send verify");
  };
  return (
    <Backdrop show={active} onClose={onClose}>
      <div className="bVerify">
        <img
          src={
            "https://designxplorer.co/wp-content/uploads/2021/01/Sample-11-1024x768.jpg"
          }
          className="bVerify__image"
        />
        <div className="bVerify__title">
          Look like we send to text you the{" "}
          <span className="bVerify__bold">OTP</span> to authenticate your
          account
        </div>
        <OtpInput
          numInputs={6}
          value={otpValue}
          onChange={onChangeHandler}
          containerStyle={{ marginTop: "3rem" }}
          isInputNum={true}
          inputStyle={{
            width: "40px",
            height: "70px",
            fontSize: "3rem",
            color: "#fab325",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            outline: "none",
            backgroundColor: "white",
          }}
          separator={<span style={{ marginRight: "10px" }} />}
        />
        <div className="bVerify__resend" role={"button"}>
          <span style={{ fontSize: "2rem", marginRight: "5px" }}>
            <MdRefresh />
          </span>
          Send me again
        </div>

        <div className="bVerify__btnGroup">
          <button
            className="bVerify__btn bVerify__btn--later"
            onClick={onClose}
          >
            Later
          </button>
          <button
            className={`bVerify__btn bVerify__btn--confirm ${
              !canVerify && "bVerify__btn--disabled"
            }`}
            onClick={verifyOtpHandler}
            disabled={!canVerify}
          >
            Confirm
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

export default BVerify;
