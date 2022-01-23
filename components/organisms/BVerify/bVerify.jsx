import Backdrop from "../../layout/backdrop";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";
import { gql, useMutation } from "@apollo/client";
import BConfirm from "../../atoms/BConfirm/BConfirm";
import verifyImage from "../../../public/images/verify.png";
import Image from "next/image";

const GET_NEW_OTP = gql`
  mutation {
    getNewEmailVerification
  }
`;

const EMAIL_VERIFY = gql`
  mutation ($otp: String!) {
    verifyEmail(otp: $otp)
  }
`;

function BVerify({ active, onClose }) {
  const [otpValue, setOtpValue] = useState("");
  const [canVerify, setCanVerify] = useState(false);
  const [activeErrorModal, setActiveErrorModal] = useState(false);
  const [error, setError] = useState(null);

  const [verifyEmail] = useMutation(EMAIL_VERIFY);
  const [getNewEmailVerification] = useMutation(GET_NEW_OTP);

  useEffect(() => {
    if (otpValue.length === 6) {
      setCanVerify(true);
    } else {
      setCanVerify(false);
    }
  }, [otpValue]);

  useEffect(() => {
    setOtpValue("");
  }, [active]);

  const onChangeHandler = (otp) => {
    setOtpValue(otp);
  };

  const requestNewOtpHandler = async () => {
    try {
      const { data } = await getNewEmailVerification();

      console.log(data.getNewEmailVerification);
    } catch (e) {
      setError(e.message);
      setActiveErrorModal(true);
    }
  };

  const verifyOtpHandler = async () => {
    if (otpValue.length < 6) {
      return;
    }
    try {
      const { data } = await verifyEmail({
        variables: {
          otp: otpValue,
        },
        errorPolicy: "none",
      });

      console.log(data.verifyEmail);
      onClose();
      location.reload();
    } catch (e) {
      setError(e.message);
      setActiveErrorModal(true);
    }
  };

  const errorModalConfirm = () => {
    setOtpValue("");
    setError(null);
    setActiveErrorModal(false);
  };
  return (
    <Backdrop show={active} onClose={onClose}>
      <BConfirm
        active={activeErrorModal}
        onClose={errorModalConfirm}
        body={error}
        title={"An error occurred"}
        onConfirm={errorModalConfirm}
        confirmOnly={true}
        confirmText={"OK"}
      />
      <div className="bVerify">
        <Image
          src={verifyImage}
          alt="verifyImage"
          className="bVerify__image"
          width={350}
          height={200}
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
        <div
          className="bVerify__resend"
          role={"button"}
          onClick={requestNewOtpHandler}
        >
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
