import Link from "next/link";
import { Fragment, useContext } from "react";
import useTimer from "../../../hooks/useTimer";
import LayoutContext from "../../../store/layout-context";

function ItemHero(props) {
  const layoutCtx = useContext(LayoutContext);
  const time = useTimer(props.item.endTime);

  let timeText = `${time.timerHours}h ${time.timerMinutes}m ${time.timerSeconds}s`;
  if (props.item.endTime < new Date().toLocaleString("en-Us")) {
    timeText = "END";
  }
  let auctionTextClass = "auction-text";
  if (time.timerHours == 0 && time.timerMinutes <= 14) {
    auctionTextClass = "auction-text auction-text--red";
  }

  let watchlistsClass = "watchlists__icon";
  if (props.item.watched) {
    watchlistsClass = "watch__icon--red";
  }

  const onPlaceBid = () => {
    layoutCtx.setAuth(true);
    layoutCtx.setType("bid");
  };

  return (
    <div className="item-hero">
      <div className="item-hero__img-box">
        <Link href="/items">
          <a>
            <img
              src={props.item.img}
              alt={props.item.title}
              className="item-hero__img"
            />
          </a>
        </Link>
      </div>

      <div className="item-hero__detail">
        <Link href="/items">
          <a className="item-hero__detail-title">{props.item.title}</a>
        </Link>
        <a href="#" className="item-hero__detail-seller">
          <span className="at-sign">@</span>
          {props.item.seller}
        </a>
        <div className="item-hero__detail-desc">{props.item.desc}</div>
        <div className="item-hero__detail-auction">
          <div className="item-hero__detail-auction-res">
            {props.item.lastPrice ? (
              <Fragment>
                <span className="item-hero__detail-auction-text">
                  Current bid
                </span>
                <span className="auction-text">{props.item.lastPrice}฿</span>
              </Fragment>
            ) : (
              <Fragment>
                <span className="item-hero__detail-auction-text">
                  Reserve bid
                </span>
                <span className="auction-text">{props.item.price}฿</span>
              </Fragment>
            )}
          </div>
          <div className="item-hero__detail-auction-time">
            <span className="item-hero__detail-auction-text">
              Auction ending in
            </span>
            <span className={auctionTextClass}>{timeText}</span>
          </div>
        </div>

        <a onClick={onPlaceBid} className="btn">
          Place a bid
        </a>

        <div className="watchlists--hero">
          <div className="watch__icon-box">
            <img
              src="/images/SVG/heart-outlined.svg"
              alt="bookmark img"
              className={watchlistsClass}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemHero;
