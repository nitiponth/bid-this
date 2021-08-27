import { useContext, useState, useRef } from "react";
import LayoutContext from "../../../store/layout-context";

function BidItem() {
  const layoutCtx = useContext(LayoutContext);

  const onClose = () => {
    layoutCtx.setAuth(false);
    layoutCtx.setType(null);
  };

  // const bidInput = useRef();
  const [bidPrice, setBidPrice] = useState(2000);

  const onBidChangeHandler = (event) => {
    setBidPrice(+event.target.value);
  };

  const onPlus = () => {
    setBidPrice((prevBidPrice) =>
      +prevBidPrice + 100 <= 5000 ? +prevBidPrice + 100 : +prevBidPrice
    );
  };
  const onMinus = () => {
    setBidPrice((prevBidPrice) =>
      +prevBidPrice - 100 >= 2000 ? +prevBidPrice - 100 : +prevBidPrice
    );
  };

  let btnStyle = "btn btn--w60";
  if (bidPrice < 2000 || bidPrice > 5000) {
    btnStyle = "btn btn--w60 btn--disabled";
  }
  return (
    <div className="bid-item">
      <div className="close-btn" onClick={onClose}>
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
          value={bidPrice}
          type="number"
          id="bidPrice"
          placeholder="0"
          onChange={onBidChangeHandler}
          className="auction__bid-price"
        />
        <div className="auction__btn-group">
          <button className="auction__btn-minus" onClick={onMinus}>
            - {"100"}
          </button>
          <button className="auction__btn-plus" onClick={onPlus}>
            {"100"} +
          </button>
        </div>
        <div className="auction__user-credits">
          <span className="auction__user-credits--text">Your balance</span>
          <span className="auction__user-credits--value">{5000} ฿</span>
        </div>
        <label className="glabel u-margin-bottom-extra-small">
          Once a bid is placed, it cannot be withdrawn
        </label>
        <a href="#" className={btnStyle}>
          Place a bid
        </a>
      </div>
    </div>
  );
}

export default BidItem;
