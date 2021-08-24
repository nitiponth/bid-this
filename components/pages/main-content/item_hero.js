import Link from "next/link";
import useTimer from "../../../hooks/useTimer";

function ItemHero(props) {
  const time = useTimer(props.item.endTime);

  let auctionTextClass = "auction-text";
  if (time.timerHours == 0 && time.timerMinutes <= 14) {
    auctionTextClass = "auction-text auction-text--red";
  }

  let watchlistsClass = "watchlists__icon";
  if (props.item.watched) {
    watchlistsClass = "watch__icon--red";
  }

  return (
    <div className="item-hero">
      <div className="item-hero__img-box">
        <a href="#">
          <img
            src={props.item.img}
            alt={props.item.title}
            className="item-hero__img"
          />
        </a>
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
            <span className="item-hero__detail-auction-text">Current bid</span>
            <span className="auction-text">{props.item.resPrice}฿</span>
          </div>
          <div className="item-hero__detail-auction-time">
            <span className="item-hero__detail-auction-text">
              Auction ending in
            </span>
            <span className={auctionTextClass}>
              {time.timerHours}h {time.timerMinutes}m {time.timerSeconds}s
            </span>
          </div>
        </div>

        <a href="#" className="btn">
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
