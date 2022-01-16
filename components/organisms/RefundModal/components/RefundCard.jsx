import { useEffect, useState } from "react";
import { RiRefund2Fill } from "react-icons/ri";

const statusType = {
  req: "REQUEST",
  success: "SUCCESS",
};

function RefundCard({ amount, status = statusType.req }) {
  return (
    <div
      className={`refundModal__card ${
        status === statusType.success && "refundModal__card--success"
      }`}
    >
      <RiRefund2Fill className="refundModal__card__icon" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="refundModal__card__title">{`${
          status === statusType.success ? "Refunded" : "Request Refund ?"
        }`}</div>
        <div className="refundModal__card__amount">
          {amount.toLocaleString()}฿
        </div>
      </div>
    </div>
  );
}

export default RefundCard;
