import Image from "next/dist/client/image";
import Logo from "../../public/images/logo-land.png";
import Backdrop from "../layout/backdrop";
import BForm from "../atoms/BForm/bForm";
import BInput from "../atoms/BInput/bInput";
import BButton from "../atoms/BButton/bButton";
import { useState } from "react";
import BCheckbox from "../atoms/BCheckbox/bCheckbox";
import { IoCloseSharp } from "react-icons/io5";
import {
  getExpMonth,
  getExpYear,
  toCreditCard,
  toExpDate,
} from "../../utils/stringFormat";
import { gql, useMutation } from "@apollo/client";

const DEPOSIT_CREDIT = gql`
  mutation ($amount: Int!, $paymentInfo: PaymentInfo, $save: Boolean) {
    depositCredit(amount: $amount, paymentInfo: $paymentInfo, save: $save) {
      amount
    }
  }
`;

function BTopupModal({
  active,
  onClose,
  amount = 0,
  setActiveWaitingModal,
  setWaitingText,
}) {
  const [cardInput, setCardInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [expiredInput, setExpiredInput] = useState("");
  const [cvcInput, setCvcInput] = useState("");
  const [isSaveCard, setIsSaveCard] = useState(true);

  const [depositCredit] = useMutation(DEPOSIT_CREDIT);

  const onCloseHandler = () => {
    setCardInput("");
    setNameInput("");
    setExpiredInput("");
    setCvcInput("");
    setIsSaveCard(true);
    onClose();
  };

  const depositeCreditHandler = async () => {
    if (getExpMonth(expiredInput) > 12 || getExpMonth(expiredInput) <= 0) {
      console.log("Card Expired is invalid, Please check your infomation.");
      return;
    }

    const today = new Date();
    let someday = new Date();
    someday.setFullYear(
      20 + getExpYear(expiredInput),
      getExpMonth(expiredInput) - 1,
      someday.getDate()
    );

    if (someday < today) {
      console.log("this card is expired");
      return;
    }

    onClose();
    setActiveWaitingModal(true);

    const { data } = await depositCredit({
      variables: {
        amount: amount,
        paymentInfo: {
          card: cardInput.replace(/\s+/g, ""),
          name: nameInput.trim(),
          expMonth: getExpMonth(expiredInput),
          expYear: getExpYear(expiredInput),
          cvc: cvcInput,
        },
        save: isSaveCard,
      },
    });

    if (data) {
      setWaitingText(`Deposite ${amount}฿ successfully.`);
      onCloseHandler();
    } else {
      setWaitingText(`Something went wrong. Please contact our admin.`);
      console.log(errors);
    }
  };

  return (
    <Backdrop show={active} onClose={onCloseHandler}>
      <div className="topupModal">
        <div
          className="close-btn"
          style={{
            fontSize: "2rem",
            position: "absolute",
            top: 20,
            right: 20,
          }}
          onClick={onCloseHandler}
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
              value={cardInput}
              onChange={(e) => setCardInput(toCreditCard(e.target.value))}
              inputStyles={{ width: "100%" }}
            />
            <BInput
              label="Name on card"
              type={"text"}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              inputStyles={{ width: "100%" }}
            />
            <div style={{ display: "flex", flex: 1 }}>
              <div style={{ width: "50%" }}>
                <BInput
                  label="Expiry date"
                  type={"text"}
                  value={expiredInput}
                  onChange={(e) => setExpiredInput(toExpDate(e.target.value))}
                  inputStyles={{ width: "95%" }}
                />
              </div>
              <div style={{ width: "50%" }}>
                <BInput
                  label="Security code"
                  type={"password"}
                  value={cvcInput}
                  onChange={(e) => setCvcInput(e.target.value)}
                  inputStyles={{ width: "95%" }}
                  inputProps={{ maxLength: 3 }}
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
                depositeCreditHandler();
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
