import { useQuery } from "@apollo/client";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import { useTransactionStore } from "../../../store/transactionStore";
import { COLOR } from "../../../utils/COLOR";
import { GET_TRANSACTIONS } from "../../../utils/networking/graphQL/credits";
import Transaction from "./transaction";

const ScrollableTransactionsList = styled.div`
  width: 100%;
  max-height: 50rem;
  padding: 3rem;
  padding-top: 0;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 5px 0;
`;

function Transactions() {
  const { transactions, metadata, updateTransaction } = useTransactionStore();

  const { refetch } = useQuery(GET_TRANSACTIONS, {
    fetchPolicy: "standby",
  });

  const onLoadMore = async () => {
    const { data } = await refetch({
      offset: metadata.current,
    });
    if (data) {
      const { metadata, data: trans } = data.getTransactionsByUserId;
      updateTransaction(trans, metadata);
    }
  };

  const transactionLists = transactions.map((tran) => (
    <Transaction key={tran._id} data={tran} />
  ));

  return (
    <ScrollableTransactionsList id="transListDiv">
      <InfiniteScroll
        dataLength={metadata.current}
        next={onLoadMore}
        hasMore={metadata.current < metadata.count}
        scrollableTarget="transListDiv"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "3rem",
        }}
        loader={
          <Footer>
            <PulseLoader color={COLOR.PRIMARY_YELLOW} size={10} />
          </Footer>
        }
      >
        {transactionLists}
      </InfiniteScroll>
    </ScrollableTransactionsList>
  );
}

export default observer(Transactions);
