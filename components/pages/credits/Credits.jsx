import { useMutation, useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
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
  UPDATE_TRANSACTIONS,
} from "../../../utils/networking/graphQL/credits";
import styled from "styled-components";
import { COLOR } from "../../../utils/COLOR";
import { IoMdRefresh } from "react-icons/io";
import { PulseLoader } from "react-spinners";

const TransactionContainer = styled.div`
  border-bottom: 1px solid var(--color-grey-light-3);
  background-color: var(--color-grey-light-1);

  padding: 0 3rem;
  border-radius: 2rem;

  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TransactionTitle = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
`;

const RefreshButtom = styled.button`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  bottom: 10px;
  right: 0;
  flex: 1;
  width: 7.5rem;
  font-family: inherit;
  padding: 1rem 0rem;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
  font-size: 1.8;
  color: ${COLOR.LIGHTYELLOW3};
  background-color: var(--color-grey-light-1);

  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

function Credits() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTopup, setShowTopup] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [showWithdraw, setShowWithdraw] = useState(false);

  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const { wallet } = useAccountStore();
  const { initializeTransactions, transactions, setRefetchTransactions } =
    useTransactionStore();

  const { data, refetch } = useQuery(CARDS_QUERY, {
    ssr: false,
    fetchPolicy: "network-only",
  });

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

  const [updateTransactions] = useMutation(UPDATE_TRANSACTIONS, {
    fetchPolicy: "network-only",
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
    if (transactionsData) {
      const { data, metadata } = transactionsData.getTransactionsByUserId;
      initializeTransactions(data, metadata);
      setRefetchTransactions(refetchTransactions);
    }
  }, [transactionsData, transactionsLoading]);

  const [updateRepActive] = useMutation(UPDATE_REP, {
    fetchPolicy: "network-only",
  });

  const updateTransactionHandler = async () => {
    try {
      setTransactionLoading(true);
      const { data: updateData } = await updateTransactions();
      if (updateData) {
        await refetchTransactions({ offset: 0 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTransactionLoading(false);
    }
  };

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
      {transactions.length > 0 && (
        <TransactionContainer>
          <TransactionTitle>
            <h2 className="history__title">Transaction history</h2>
            <RefreshButtom onClick={updateTransactionHandler}>
              {!transactionLoading ? (
                <Fragment>
                  <IoMdRefresh style={{ marginRight: "5px" }} size={20} />{" "}
                  Refresh
                </Fragment>
              ) : (
                <PulseLoader color={COLOR.PRIMARY_YELLOW} size={10} />
              )}
            </RefreshButtom>
          </TransactionTitle>
          <Transaction trans={transactions.slice()} />
        </TransactionContainer>
      )}
    </div>
  );
}

export default observer(Credits);
