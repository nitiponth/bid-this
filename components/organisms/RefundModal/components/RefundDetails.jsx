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
  isExtended,
}) {
  const limitDays = new Date(end);
  if (isExtended) {
    limitDays.setDate(limitDays.getDate() + 14);
  } else {
    limitDays.setDate(limitDays.getDate() + 7);
  }

  const refundDate = limitDays.toLocaleString("EN-us");
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
        topic={"Date that can be refunded"}
        detail={refundDate}
      />
      <RefundRowDetail
        topic={"Final auction price"}
        detail={`${finalPrice.toLocaleString()}฿`}
      />
    </div>
  );
}

export default RefundDetails;
