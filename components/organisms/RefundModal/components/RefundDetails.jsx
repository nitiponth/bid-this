import RefundRowDetail from "./RefundRowDetail";

function RefundDetails({
  end,
  finalPrice,
  id,
  seller,
  sellerId,
  title,
  winner,
  winnerId,
}) {
  return (
    <div className="refundModal__details">
      <div className="refundModal__details__title">Auction details</div>
      <RefundRowDetail topic={"Product"} detail={title} />
      <RefundRowDetail topic={"Product ID"} detail={id} />
      <RefundRowDetail topic={"Seller"} detail={`@${seller}`} />
      <RefundRowDetail topic={"Seller ID"} detail={sellerId} />
      <RefundRowDetail topic={"Winner (You)"} detail={`@${winner}`} />
      <RefundRowDetail topic={"Winner ID"} detail={winnerId} />
      <RefundRowDetail topic={"Auction end time"} detail={end} />
      <RefundRowDetail
        topic={"Final auction price"}
        detail={`${finalPrice.toLocaleString()}฿`}
      />
    </div>
  );
}

export default RefundDetails;
