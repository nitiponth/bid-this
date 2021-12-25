import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Backdrop from "../../layout/backdrop";
import AddAccountForm from "./addAccountForm";

import waitingImage from "../../../public/images/SILY/Saly-1.png";
import successImage from "../../../public/images/SILY/Saly-22.png";
import failedImage from "../../../public/images/SILY/Saly-12.png";
import BConfirm from "../../atoms/BConfirm/BConfirm";
import BModalCard from "../../atoms/BModalCard/BModalCard";

const WITHDRAW = gql`
  mutation ($bankId: String!, $amount: Int!) {
    withdrawCredit(bankId: $bankId, amount: $amount) {
      id
      amount
      type
      status
    }
  }
`;

function Withdraw(props) {
  const [showForm, setShowForm] = useState(false);
  const [withdrawCredit] = useMutation(WITHDRAW);
  const amountRef = useRef();

  const [selectedAccount, setSelectedAccount] = useState(null);

  const [activeConfirmModal, setActiveConfirmModal] = useState(false);
  const [confirmBody, setConfirmBody] = useState("");

  const [activeWaitingModal, setActiveWaitingModal] = useState(false);
  const [waitingText, setWaitingText] = useState("Process is ongoing...");
  const [waitingImg, setWaitingImg] = useState(waitingImage);

  if (!props.visible) {
    return null;
  }

  const withdrawHandler = async () => {
    const amount = +amountRef.current.value;
    if (amount < 50) {
      return;
    }

    if (!selectedAccount) {
      return;
    }

    setActiveConfirmModal(false);
    setActiveWaitingModal(true);

    const { data, errors } = await withdrawCredit({
      variables: {
        amount,
        bankId: selectedAccount.id,
      },
    });

    if (data) {
      setWaitingText(
        `Withdraw ${amount} successfully. Waiting for banking process...`
      );
      setWaitingImg(successImage);
      amountRef.current.value = "";
    } else if (errors) {
      setWaitingText(`Withdraw failed. Please contact admin`);
      setWaitingImg(failedImage);
      console.log(errors);
    }

    setSelectedAccount(null);
  };

  let existAccount = "";
  if (props.banks && props.banks.length > 0) {
    existAccount = props.banks.map((account) => {
      let btn = (
        <button
          className="existAccount__btn"
          onClick={async () => {
            const amount = +amountRef.current.value;
            if (amount < 50) {
              return;
            }
            setConfirmBody(
              `Withdraw ${amount} ฿ to *****${
                account.bankInfo.last_digits
              } (${account.bankInfo.brand.toUpperCase()})`
            );
            setSelectedAccount(account);
            setActiveConfirmModal(true);
          }}
        >
          Withdraw to this account
        </button>
      );
      if (!account.bankInfo.active) {
        btn = (
          <button className="existAccount__btn existAccount__btn--disabled">
            Withdraw to this account
          </button>
        );
      }
      return (
        <div className="withdraw__bank" key={account.id}>
          <div className="withdraw__existAccount">
            <div className="existAccount">
              <div className="existAccount__left">
                <p className="existAccount__digits">
                  ******{account.bankInfo.last_digits}
                </p>
                <p className="existAccount__brand">
                  {account.bankInfo.brand.toUpperCase()}
                </p>
              </div>
              <div className="existAccount__right">{btn}</div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="withdraw-container">
      <BConfirm
        active={activeConfirmModal}
        onClose={() => setActiveConfirmModal(false)}
        onConfirm={() => {
          withdrawHandler();
        }}
        title={"Withdraw Credit"}
        body={confirmBody}
      />
      <BModalCard
        active={activeWaitingModal}
        canClose={true}
        title={waitingText}
        cardImage={waitingImg}
        onClose={() => {
          setActiveWaitingModal(false);
          setWaitingText("Process is ongoing...");
          setWaitingImg(waitingImage);
        }}
      />
      <div className="withdraw__title">Enter amount of withdraw</div>
      <div className="withdraw__form">
        <input
          id="amount"
          type="number"
          placeholder="Withdraw fee is 50฿"
          className="withdraw__form__input"
          defaultValue={null}
          ref={amountRef}
        />
        ฿
      </div>
      {existAccount}
      <button
        className="addAccount-btn"
        onClick={() => setShowForm((prev) => !prev)}
      >
        Add new account
      </button>
      <Backdrop show={showForm}>
        <AddAccountForm onClose={setShowForm} refetch={props.refetch} />
      </Backdrop>
    </div>
  );
}

export default Withdraw;
