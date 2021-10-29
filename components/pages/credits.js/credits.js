import { gql, useMutation, useQuery } from "@apollo/client";
import { set } from "js-cookie";
import { useContext, useEffect, useState } from "react";
import Topup from "./topup";
import Transactions from "./transactions";
import Withdraw from "./withdraw";

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
      bankAccounts {
        id
        bankInfo {
          id
          name
          last_digits
          brand
          active
        }
      }
    }
  }
`;

const UPDATE_REP = gql`
  mutation {
    updateRepActive
  }
`;

const UPDATE_GET_TRANS = gql`
  mutation {
    updateAndGetTransactions {
      id
      tranId
      status
      type
      createdAt
      amount
      product {
        id
        title
      }
    }
  }
`;

function Credits() {
  const [showTopup, setShowTopup] = useState(false);
  const [showTrans, setShowTrans] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [showWithdraw, setShowWithdraw] = useState(false);
  const { data, error, loading, refetch } = useQuery(CARDS_QUERY, {
    ssr: false,
    fetchPolicy: "network-only",
  });

  const [updateRepActive] = useMutation(UPDATE_REP);
  const [updateAndGetTransactions] = useMutation(UPDATE_GET_TRANS);

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
            onClick={() => {
              setShowTopup((prev) => !prev);
              refetch();
              setShowWithdraw(false);
            }}
          >
            Topup
          </button>
          <button
            className="credits__btn credits__btn--withdraw"
            onClick={async () => {
              setShowWithdraw((prev) => !prev);
              setShowTopup(false);
              const { errors } = await updateRepActive();
              refetch();
              if (errors) {
                console.log(errors);
              }
            }}
          >
            Withdraw
          </button>
        </div>
        <Topup visible={showTopup} cards={data && data.me && data.me.cards} />
        <Withdraw
          visible={showWithdraw}
          banks={data && data.me && data.me.bankAccounts}
          refetch={refetch}
        />
      </div>
      <div className="history">
        <h2 className="history__title">Transaction history</h2>
        <button
          className="trans-btn"
          onClick={async () => {
            setShowTrans((prev) => !prev);
            if (!showTrans) {
              const { data } = await updateAndGetTransactions();
              setTransactions(data.updateAndGetTransactions.reverse());
            }
          }}
        >
          {showTrans ? "Hide Transactions" : "Show Transactions"}
        </button>
        <Transactions visible={showTrans} trans={transactions} />
      </div>
    </div>
  );
}

export default Credits;
