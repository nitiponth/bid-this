import React, { Fragment } from "react";
import Script from "react-load-script";

let OmiseCard;

const CheckoutWithInternetBanking = (props) => {
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

  const internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: ["bill_payment_tesco_lotus", "alipay"],
    });
    OmiseCard.configureButton("#internet-banking");
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: amount * 100,
      onCreateTokenSuccess: (token) => {
        console.log(token);
        //   createCreditCardCharge(user.email, user.name, cart.amount, token)
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = () => {
    internetBankingConfigure();
    omiseCardHandler();
  };

  return (
    <Fragment>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <form>
        <button
          className="pay-btn"
          id="internet-banking"
          type="button"
          disabled={!amount}
          onClick={handleClick}
        >
          Pay with Internet Banking
        </button>
      </form>
    </Fragment>
  );
};

export default CheckoutWithInternetBanking;
