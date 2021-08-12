function BidItem() {
  return (
    <div className="bid-item">
      <div className="close-btn">
        <img
          src="/images/SVG/cross.svg"
          alt="clost button"
          className="btn__close-img"
        />
      </div>
      <div className="bid-item__title">Place a bid</div>
      <div className="section__head">
        <img
          src="images/items/keyboard.jpg"
          alt="keyboard"
          className="section__head-img"
        />
      </div>
      <div className="section__auction">
        <div className="auction__title">Keyboard</div>
        <a href="#" className="auction__seller">
          @<span className="auction__seller--username">{"gorgias"}</span>
        </a>
        <label className="glabel glabel--medium">You must bid at least</label>
        <div className="auction__at-least">{"2000"} ฿</div>
        <input
          type="number"
          id="bidPrice"
          placeholder="0"
          className="auction__bid-price"
        />
        <div className="auction__btn-group">
          <button className="auction__btn-minus">- {"10"}</button>
          <button className="auction__btn-plus">{"10"} +</button>
        </div>
        <div className="auction__user-credits">
          <span className="auction__user-credits--text">Your balance</span>
          <span className="auction__user-credits--value">{5000} ฿</span>
        </div>
        <label className="glabel u-margin-bottom-extra-small">
          Once a bid is placed, it cannot be withdrawn
        </label>
        <a href="#" className="btn btn--w60">
          Place a bid
        </a>
      </div>
    </div>
  );
}

export default BidItem;
