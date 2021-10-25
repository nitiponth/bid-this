import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import Topup from "./topup";
import Transaction from "./transaction";

const DUMMY_TRANSACTIOCS = [
  {
    title: "Deposit credits",
    value: 10000,
    date: 1629699132000,
  },
  {
    title: "Withdraw credits",
    value: 3000,
    date: 1629792017000,
  },
  {
    title: "Pay for",
    productName: "Keychrone",
    productLink: "#",
    value: 3000,
    date: 1629982200000,
  },
  {
    title: "Withdraw credits",
    value: 2000,
    date: 1629986411000,
  },
];

const CARDS_QUERY = gql`
  query {
    me {
      wallet
      cards {
        id
        cardInfo {
          id
          expiration_month
          expiration_year
          last_digits
          brand
        }
      }
    }
  }
`;

function Credits() {
  const [showTopup, setShowTopup] = useState(false);
  const { data, error, loading } = useQuery(CARDS_QUERY, {
    ssr: false,
  });

  return (
    <div className="credits-container">
      <div className="credits">
        <h2 className="credits__title">Credits balance</h2>
        <h1 className="credits__balance">
          {data && data.me && data.me.wallet.toLocaleString("en")}
          <span className="credits__currency">฿ - baht</span>
        </h1>
        <div className="credits__btn-group">
          <button
            className="credits__btn credits__btn--topup"
            onClick={() => setShowTopup((prev) => !prev)}
          >
            Topup
          </button>
          <button className="credits__btn credits__btn--withdraw">
            Withdraw
          </button>
        </div>
        <Topup visible={showTopup} cards={data && data.me && data.me.cards} />
      </div>
      <div className="history">
        <h2 className="history__title">Transaction history</h2>
        <div className="history__lists">
          <Transaction data={DUMMY_TRANSACTIOCS[3]} />
          <Transaction data={DUMMY_TRANSACTIOCS[2]} />
          <Transaction data={DUMMY_TRANSACTIOCS[1]} />
          <Transaction data={DUMMY_TRANSACTIOCS[0]} />
        </div>
      </div>
    </div>
  );
}

export default Credits;
