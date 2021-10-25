import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import CheckoutWithCreditCard from "../../checkout/checkoutWithCreditCard";
import CheckoutWithInternetBanking from "../../checkout/CheckoutWithInternetBanking";

const DEPOSIT_MUTATION = gql`
  mutation ($amount: Int!, $token: String, $cardId: String) {
    depositCredit(amount: $amount, token: $token, cardId: $cardId) {
      id
      createdAt
      amount
      type
    }
  }
`;

function Topup(props) {
  const [depositCredit, { loading, error }] = useMutation(DEPOSIT_MUTATION);
  const [selected, setSelected] = useState(100);
  const amounts = [100, 300, 500, 1000, 3000, 5000, 10000];

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
          <div className="existCard__right">
            <button
              className="existCard__btn"
              onClick={() => {
                depositCredit({
                  variables: {
                    amount: selected,
                    token: null,
                    cardId: card.id,
                  },
                });
              }}
            >
              Use this card
            </button>
          </div>
        </div>
      </div>
    ));
  }

  const checkoutHandler = async (token, amount) => {
    const result = depositCredit({
      variables: {
        amount,
        token,
      },
    });

    console.log("result: ", result);
  };

  return (
    <div className="topup-container">
      <div className="topup__title">Select your Topup amounts</div>
      <div className="topup__select">{listsOfAmout}</div>
      <div className="topup__checkout">
        <CheckoutWithCreditCard
          text={creditBtnText}
          amount={selected}
          checkout={checkoutHandler}
        />
        <CheckoutWithInternetBanking amount={selected} />
      </div>
      {existCards}
    </div>
  );
}

export default Topup;
