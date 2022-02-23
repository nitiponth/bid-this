import { useMutation, useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useAccountStore } from "../../../store/accountStore";
import AuthContext from "../../../store/auth-context";
import { useTransactionStore } from "../../../store/transactionStore";
import BLoading from "../../molecules/BLoading/BLoading";
import Topup from "./topup";
import Withdraw from "./withdraw";
import Transaction from "./Transactions";
import {
  CARDS_QUERY,
  GET_TRANSACTIONS,
  UPDATE_REP,
} from "../../../utils/networking/graphQL/credits";

function Credits() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTopup, setShowTopup] = useState(false);

  const [showWithdraw, setShowWithdraw] = useState(false);

  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const { wallet } = useAccountStore();
  const { initializeTransactions, transactions, setRefetchTransactions } =
    useTransactionStore();

  const {
    data: transactionsData,
    loading: transactionsLoading,
    refetch: refetchTransactions,
  } = useQuery(GET_TRANSACTIONS, {
    fetchPolicy: "network-only",
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  useEffect(() => {
    if (!authCtx?.isLogin) {
      router.push("/");
    }

    if (authCtx.isLogin) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (transactionsData && !transactionsLoading) {
      const { data, metadata } = transactionsData.getTransactionsByUserId;
      initializeTransactions(data, metadata);
      setRefetchTransactions(refetchTransactions);
    }
  }, [transactionsData, transactionsLoading]);

  const { data, refetch } = useQuery(CARDS_QUERY, {
    ssr: false,
    fetchPolicy: "network-only",
  });

  const [updateRepActive] = useMutation(UPDATE_REP);

  if (isLoading) {
    return <BLoading />;
  }

  return (
    <div className="credits-container">
      <div className="credits">
        <h2 className="credits__title">Credits balance</h2>
        <h1 className="credits__balance">
          {wallet.toLocaleString("en")}
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
        <Topup
          visible={showTopup}
          cards={data && data.me && data.me.cards}
          refetch={refetch}
        />
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
          // onClick={async () => {
          //   setShowTrans((prev) => !prev);
          //   if (!showTrans) {
          //     const { data } = await updateAndGetTransactions();
          //     setTransactions(data.updateAndGetTransactions.reverse());
          //   }
          // }}
        >
          Refresh
        </button>
        <Transaction trans={transactions.slice()} />
      </div>
    </div>
  );
}

export default observer(Credits);
