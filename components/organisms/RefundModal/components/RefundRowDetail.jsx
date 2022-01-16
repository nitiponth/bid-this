function RefundRowDetail({ topic, detail = "-" }) {
  return (
    <div className="refundModal__details__row">
      <div className="refundModal__details__row__topic">{topic}</div>
      <div className="refundModal__details__row__detail">{detail}</div>
    </div>
  );
}

export default RefundRowDetail;
