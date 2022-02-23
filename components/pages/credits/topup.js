import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { IoClose } from "react-icons/io5";
import BConfirm from "../../atoms/BConfirm/BConfirm";
import BModalCard from "../../atoms/BModalCard/BModalCard";

import waitingImage from "../../../public/images/SILY/Saly-1.png";
import successImage from "../../../public/images/SILY/Saly-22.png";
import failedImage from "../../../public/images/SILY/Saly-12.png";
import TopupWithCrediteCard from "../../checkout/topupWithCrediteCard";
import { useTransactionStore } from "../../../store/transactionStore";

const DEPOSIT_MUTATION = gql`
  mutation ($amount: Int!, $cardId: String) {
    depositCredit(amount: $amount, cardId: $cardId) {
      _id
      createdAt
      amount
      type
    }
  }
`;

const REMOVE_CARD = gql`
  mutation ($custId: String!) {
    removeCard(custId: $custId)
  }
`;

function Topup(props) {
  const { refetchTransactions } = useTransactionStore();
  const [activeConfirmModal, setActiveConfirmModal] = useState(false);
  const [confirmBody, setConfirmBody] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeWaitingModal, setActiveWaitingModal] = useState(false);
  const [waitingText, setWaitingText] = useState("Process is ongoing...");
  const [waitingImg, setWaitingImg] = useState(waitingImage);
  const [depositCredit, { loading, error }] = useMutation(DEPOSIT_MUTATION);
  const [selected, setSelected] = useState(100);
  const amounts = [100, 300, 500, 1000, 3000, 5000, 10000];

  const [removeCard] = useMutation(REMOVE_CARD);

  if (!props.visible) {
    return null;
  }
  const listsOfAmout = amounts.map((item, idx) => {
    if (item === selected) {
      return (
        <div
          key={idx}
          className="topup__select__box topup__select__box--selected"
        >
          {item.toLocaleString("en")}
        </div>
      );
    }
    return (
      <div
        key={idx}
        className="topup__select__box"
        onClick={() => setSelected(item)}
      >
        {item.toLocaleString("en")}
      </div>
    );
  });

  const topupConfirmHandler = async () => {
    if (!selectedCard) {
      return;
    }

    setActiveConfirmModal(false);
    setActiveWaitingModal(true);

    try {
      const result = await depositCredit({
        variables: {
          amount: selected,
          cardId: selectedCard.id,
        },
      });

      if (result.data) {
        setWaitingText(
          `Deposit ${selected.toLocaleString("En")}฿ successfully.`
        );
        setWaitingImg(successImage);
      } else if (result.errors) {
        setWaitingText(`Payment failed. Please contact admin`);
        setWaitingImg(failedImage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedCard(null);
      refetchTransactions();
    }
  };

  let existCards = "";
  let creditBtnText = "Pay with Credit Card";

  if (props.cards && props.cards.length > 0) {
    creditBtnText = "Pay with New Credit Card";
    existCards = props.cards.map((card) => (
      <div className="topup__existCard" key={card.id}>
        <div className="existCard">
          <div className="existCard__left">
            <p className="existCard__digits">
              {" "}
              **** **** **** {card.cardInfo.last_digits}
            </p>
            <div className="existCard__left--line">
              <p className="existCard__date">
                {card.cardInfo.expiration_month.toLocaleString("en", {
                  minimumIntegerDigits: 2,
                })}
                /{card.cardInfo.expiration_year % 100}
              </p>
              <p className="existCard__brand">{card.cardInfo.brand}</p>
            </div>
          </div>
          <div
            className="existCard__right"
            style={{ display: "flex", alignItems: "center" }}
          >
            <button
              className="existCard__btn"
              onClick={() => {
                setConfirmBody(
                  `Deposite ${selected.toLocaleString(
                    "En"
                  )}฿ with **** **** **** ${card.cardInfo.last_digits}`
                );
                setSelectedCard(card);
                setActiveConfirmModal(true);
              }}
            >
              Use this card
            </button>
            <div
              className="delete-btn"
              onClick={async () => {
                const { data, errors } = await removeCard({
                  variables: {
                    custId: card.id,
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
    ));
  }

  return (
    <div className="topup-container">
      <BConfirm
        active={activeConfirmModal}
        onClose={() => setActiveConfirmModal(false)}
        onConfirm={() => {
          topupConfirmHandler();
        }}
        title={"Deposit Credit"}
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
      <div className="topup__title">Select your Topup amounts</div>
      <div className="topup__select">{listsOfAmout}</div>
      <div className="topup__checkout">
        <TopupWithCrediteCard amount={selected} />
      </div>
      {existCards}
    </div>
  );
}

export default Topup;
