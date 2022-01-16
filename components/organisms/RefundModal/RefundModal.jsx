import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import BConfirm from "../../atoms/BConfirm/BConfirm";
import Backdrop from "../../layout/backdrop";
import RefundCard from "./components/RefundCard";
import RefundDetails from "./components/RefundDetails";

const REFUND_PRODUCT = gql`
  mutation ($productId: ID!) {
    refundProduct(productId: $productId)
  }
`;

const EXTEND_TIME = gql`
  mutation ($productId: ID!) {
    extendDeliveryTime(productId: $productId)
  }
`;

const statusType = {
  req: "REQUEST",
  success: "SUCCESS",
};

function RefundModal({ active, onClose, refund, isDone }) {
  const { finalPrice, id, end, status: productStatus, refetch, title } = refund;

  const [status, setStatus] = useState(statusType.req);
  const [isExtended, setIsExtended] = useState(refund.extendTime);
  const [canRefund, setCanRefund] = useState(false);
  const [activeConfirmModal, setActiveConfirmModal] = useState(false);

  const [refundProduct] = useMutation(REFUND_PRODUCT);
  const [extendDeliveryTime] = useMutation(EXTEND_TIME);

  useEffect(() => {
    const limitDays = checkLimitDays(end);
    const now = new Date();

    if (now > limitDays) {
      setCanRefund(true);
    } else {
      setCanRefund(false);
    }

    if (productStatus === "REFUNDED") {
      setCanRefund(false);
    }
  }, [isExtended, end, productStatus]);

  const refundHandler = async () => {
    const { data, errors } = await refundProduct({
      variables: {
        productId: id,
      },
    });

    if (data) {
      //   console.log(data);
      setCanRefund(false);
      setStatus("SUCCESS");
      setActiveConfirmModal(false);
      refetch();
    } else {
      console.log(errors);
    }
  };

  const extendDeliveryTimeHandler = async () => {
    const { data, errors } = await extendDeliveryTime({
      variables: {
        productId: id,
      },
    });

    if (data) {
      //   console.log(data);
      setIsExtended(true);
      refetch();
    } else {
      console.log(errors);
    }
  };

  const checkLimitDays = (endDate) => {
    const limitDays = new Date(endDate);
    if (isExtended) {
      limitDays.setDate(limitDays.getDate() + 14);
    } else {
      limitDays.setDate(limitDays.getDate() + 7);
    }

    return limitDays;
  };

  return (
    <Backdrop show={active} onClose={onClose}>
      <BConfirm
        active={activeConfirmModal}
        onConfirm={refundHandler}
        title={`Refund ${title} ?`}
        body={"Would you like to request a refund of this product?"}
        onClose={() => setActiveConfirmModal(false)}
      />
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
        <RefundDetails {...refund} isExtended={isExtended} />
        <div className="refundModal__btnGroup">
          <button
            disabled={isExtended}
            onClick={extendDeliveryTimeHandler}
            className={`refundModal__btnGroup__btn refundModal__btnGroup__btn--extend ${
              (status === statusType.success || isExtended) &&
              "refundModal__btnGroup__btn--disabled"
            }`}
          >
            Extend Time
          </button>
          <button
            disabled={!canRefund}
            onClick={() => setActiveConfirmModal(true)}
            className={`refundModal__btnGroup__btn refundModal__btnGroup__btn--refund ${
              (status === statusType.success || !canRefund) &&
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
