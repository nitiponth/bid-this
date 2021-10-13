import Backdrop from "../../layout/backdrop";
import BidItem from "./bid-item";

function Bid() {
  return (
    <Backdrop show={true}>
      <BidItem />
    </Backdrop>
  );
}

export default Bid;
