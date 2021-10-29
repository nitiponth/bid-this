import { useMemo } from "react";
import Transaction from "./transaction";

function Transactions(props) {
  if (!props.visible) {
    return "";
  }

  const transactionLists = props.trans.map((tran) => (
    <Transaction key={tran.id} data={tran} />
  ));

  return <div className="history__lists">{transactionLists}</div>;
}

export default Transactions;
