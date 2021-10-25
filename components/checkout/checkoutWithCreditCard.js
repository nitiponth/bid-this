import React, { Fragment, useContext } from "react";
import Script from "react-load-script";
import AuthContext from "../../store/auth-context";

let OmiseCard;

const CheckoutWithCreditCard = (props) => {
  const amount = props.amount;

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: process.env.OMISE_PUBLIC_KEY,
      currency: "thb",
      frameLabel: "BidThis",
      submitLabel: "PAY NOW",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    OmiseCard.open({
      frameDescription:
        "Please check the amount of credits you want to pay before pressing the pay button.",
      amount: amount * 100,
      onCreateTokenSuccess: (token) => {
        props.checkout(token, amount);
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = () => {
    creditCardConfigure();
    omiseCardHandler();
  };

  return (
    <Fragment>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <form>
        <button
          className="pay-btn"
          id="credit-card"
          type="button"
          disabled={!amount}
          onClick={handleClick}
        >
          {props.text}
        </button>
      </form>
    </Fragment>
  );
};

export default CheckoutWithCreditCard;
