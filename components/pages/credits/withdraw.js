import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { IoClose } from "react-icons/io5";

import Backdrop from "../../layout/backdrop";
import AddAccountForm from "./addAccountForm";

import waitingImage from "../../../public/images/SILY/Saly-1.png";
import successImage from "../../../public/images/SILY/Saly-22.png";
import failedImage from "../../../public/images/SILY/Saly-12.png";
import BConfirm from "../../atoms/BConfirm/BConfirm";
import BModalCard from "../../atoms/BModalCard/BModalCard";
import { useTransactionStore } from "../../../store/transactionStore";

const WITHDRAW = gql`
  mutation ($bankId: String!, $amount: Int!) {
    withdrawCredit(bankId: $bankId, amount: $amount) {
      _id
      amount
      type
      status
    }
  }
`;

const REMOVE_REPT = gql`
  mutation ($reptId: String!) {
    removeRecipient(reptId: $reptId)
  }
`;

function Withdraw(props) {
  const { refetchTransactions } = useTransactionStore();
  const [showForm, setShowForm] = useState(false);
  const [withdrawCredit] = useMutation(WITHDRAW);
  const [removeRecipient] = useMutation(REMOVE_REPT);
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

    try {
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
    } catch (error) {
      console.log(error);
    } finally {
      await refetchTransactions({ offset: 0 });
    }
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
              `Withdraw ${amount} ??? to *****${
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
              <div
                className="existAccount__right"
                style={{ display: "flex", alignItems: "center" }}
              >
                {btn}
                <div
                  className="delete-btn"
                  onClick={async () => {
                    const { data, errors } = await removeRecipient({
                      variables: {
                        reptId: account.id,
                      },
                    });
                    if (data) {
                      props.refetch();
                    } else {
                      console.log(errors);
                    }
                  }}
                  style={{ marginLeft: "1rem", marginTop: "1rem" }}
                >
                  <IoClose />
                </div>
              </div>
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
          placeholder="Withdraw fee is 40???"
          className="withdraw__form__input"
          defaultValue={null}
          ref={amountRef}
        />
        ???
      </div>
      {existAccount}
      <button className="addAccount-btn" onClick={() => setShowForm(true)}>
        Add new account
      </button>
      <Backdrop show={showForm} onClose={() => setShowForm(false)}>
        <AddAccountForm onClose={setShowForm} refetch={props.refetch} />
      </Backdrop>
    </div>
  );
}

export default Withdraw;
