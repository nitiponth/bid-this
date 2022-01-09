import Image from "next/dist/client/image";
import Logo from "../../public/images/logo-land.png";
import Backdrop from "../layout/backdrop";
import BForm from "../atoms/BForm/bForm";
import BInput from "../atoms/BInput/bInput";
import BButton from "../atoms/BButton/bButton";
import { useState } from "react";
import BCheckbox from "../atoms/BCheckbox/bCheckbox";
import { IoCloseSharp } from "react-icons/io5";

function BTopupModal({ active, onClose, amount = 0 }) {
  const [cardInput, setCardInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [expiredInput, setExpiredInput] = useState("");
  const [cvcInput, setCvcInput] = useState("");
  const [isSaveCard, setIsSaveCard] = useState(true);

  const cc_format = (value) => {
    let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const expDateFormatter = (expDate) => {
    return (
      expDate.replace(/\//g, "").substring(0, 2) +
      (expDate.length > 2 ? "/" : "") +
      expDate.replace(/\//g, "").substring(2, 4)
    );
  };

  return (
    <Backdrop show={active} onClose={onClose}>
      <div className="topupModal">
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
        <div style={{ alignSelf: "center" }}>
          <Image src={Logo} width={200} height={90} />
        </div>
        <p className="topupModal__desc">
          Please check the amount of credits you want to pay before pressing the
          pay button.
        </p>
        <div className="topupModal__type">Credit / Debit</div>
        <div style={{ width: "100%" }}>
          <BForm>
            <BInput
              label="Card number"
              type={"text"}
              value={cc_format(cardInput)}
              onChange={(e) => setCardInput(e.target.value)}
              inputStyles={{ width: "100%" }}
            />
            <BInput
              label="Name on card"
              type={"text"}
              inputStyles={{ width: "100%" }}
            />
            <div style={{ display: "flex", flex: 1 }}>
              <div style={{ width: "50%" }}>
                <BInput
                  label="Expiry date"
                  type={"text"}
                  value={expDateFormatter(expiredInput)}
                  onChange={(e) => setExpiredInput(e.target.value)}
                  inputStyles={{ width: "95%" }}
                />
              </div>
              <div style={{ width: "50%" }}>
                <BInput
                  label="Security code"
                  type={"text"}
                  inputStyles={{ width: "95%" }}
                />
              </div>
            </div>
            <BInput
              label="Country or region"
              disabled={true}
              type={"text"}
              placeholder="Thailand"
              inputStyles={{ width: "100%" }}
            />
            <div
              style={{
                height: "50px",
                alignSelf: "center",
                marginLeft: "-2rem",
              }}
            >
              <BCheckbox
                label="Save this card"
                isSave={isSaveCard}
                setIsSaveCard={setIsSaveCard}
              />
            </div>
            <BButton
              // disabled={true}
              title={`PAY NOW ${amount.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} THB`}
              onClick={() => {
                alert(`${cardInput} \n ${expiredInput}`);
              }}
              containerStyles={{
                width: "300px",
                alignSelf: "center",
              }}
            />
          </BForm>
        </div>
      </div>
    </Backdrop>
  );
}

export default BTopupModal;
