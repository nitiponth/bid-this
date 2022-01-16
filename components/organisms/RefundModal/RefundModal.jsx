import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import Backdrop from "../../layout/backdrop";
import RefundCard from "./components/RefundCard";
import RefundDetails from "./components/RefundDetails";

const statusType = {
  req: "REQUEST",
  success: "SUCCESS",
};

function RefundModal({ active, onClose, refund, isDone }) {
  const [status, setStatus] = useState(statusType.req);
  const { finalPrice } = refund;

  return (
    <Backdrop show={active} onClose={onClose}>
      <div className="refundModal">
        <div
          className="close-btn"
          style={{
            fontSize: "2rem",
            position: "absolute",
            top: 20,
            right: 20,
          }}
          onClick={onClose}
        >
          <IoCloseSharp />
        </div>

        <div className="refundModal__header">Details</div>
        <RefundCard amount={finalPrice} status={status} />
        <RefundDetails {...refund} />
        <div className="refundModal__btnGroup">
          <button
            disabled={true}
            className={`refundModal__btnGroup__btn refundModal__btnGroup__btn--extend ${
              status === statusType.success &&
              "refundModal__btnGroup__btn--disabled"
            }`}
          >
            Extend Time
          </button>
          <button
            className={`refundModal__btnGroup__btn refundModal__btnGroup__btn--refund ${
              status === statusType.success &&
              "refundModal__btnGroup__btn--disabled"
            }`}
          >
            Refund Credits
          </button>
          <button className="refundModal__btnGroup__btn refundModal__btnGroup__btn--support">
            <BiSupport />
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

export default RefundModal;
