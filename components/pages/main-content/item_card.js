import { useState } from "react";
import useTimer from "../../../hooks/useTimer";

function ItemCard(props) {
  const time = useTimer(props.item.endTime);
  let auctionTextClass = "auction-text--card";

  if (time.timerHours == 0 && time.timerMinutes <= 14) {
    auctionTextClass = "auction-text--card auction-text--card--red";
  }

  const [isWatched, setIsWatched] = useState(props.item.watched);

  let watchlistsClass = "watchlists__icon";
  if (props.item.watched) {
    watchlistsClass = "watch__icon--red";
  }
  return (
    <div className="item-card">
      <div className="watchlists--card">
        <div className="watch__icon-box">
          <img
            src="/images/SVG/heart-outlined.svg"
            alt="bookmark img"
            className={watchlistsClass}
            onClick={() => setIsWatched(!isWatched)}
          />
        </div>
      </div>
      <div className="item-card__img-box">
        <a href="#">
          <img
            src={props.item.img}
            alt={props.item.title}
            className="item-card__img"
          />
        </a>
      </div>

      <div className="item-card__detail">
        <a href="#" className="item-card__detail-title">
          {props.item.title}
        </a>
        <a href="#" className="item-card__detail-seller">
          <span className="at-sign">@</span>
          {props.item.seller}
        </a>
        <div className="item-card__detail-desc">{props.item.desc}</div>
        <div className="item-card__detail-auction">
          <div className="item-card__detail-auction-res">
            <span className="item-card__detail-auction-text">Current bid</span>
            <span className="auction-text--card">{props.item.resPrice}฿</span>
          </div>
          <div className="item-card__detail-auction-time">
            <span className="item-card__detail-auction-text">
              Auction ending in
            </span>
            <span className={auctionTextClass}>
              {time.timerComplete ||
                `${time.timerHours}h ${time.timerMinutes}m ${time.timerSeconds}s`}
              {time.timerComplete && "END"}
            </span>
          </div>
        </div>
        <a href="#" className="btn--card">
          <img
            src="/images/ios-icon/magnifying-glass-tilted-left.png"
            alt="Clothing"
            className="btn--card-img"
          />
        </a>
      </div>
    </div>
  );
}

export default ItemCard;
