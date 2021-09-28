import { Fragment, useState } from "react";
import Link from "next/dist/client/link";
import useTimer from "../../../hooks/useTimer";

function ItemCard(props) {
  const time = useTimer(props.item.endTime);

  let timeText = `${time.timerHours}h ${time.timerMinutes}m ${time.timerSeconds}s`;
  if (props.item.endTime < new Date().toLocaleDateString("en-US")) {
    timeText = "END";
  }

  let auctionTextClass = "auction-text--card";

  if (time.timerHours == 0 && time.timerMinutes <= 14) {
    auctionTextClass = "auction-text--card auction-text--card--red";
  }

  const [isWatched, setIsWatched] = useState(props.item.watched);

  let watchlistsClass = "watchlists__icon";
  if (props.item.watched) {
    watchlistsClass = "watch__icon--red";
  }

  const link = `/items/${props.item.productId}`;

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
        <Link href={link}>
          <a>
            <img
              src={props.item.img}
              alt={props.item.title}
              className="item-card__img"
            />
          </a>
        </Link>
      </div>

      <div className="item-card__detail">
        <Link href={link}>
          <a href="#" className="item-card__detail-title">
            {props.item.title}
          </a>
        </Link>
        <a href="#" className="item-card__detail-seller">
          <span className="at-sign">@</span>
          {props.item.seller}
        </a>
        <div className="item-card__detail-desc">{props.item.desc}</div>
        <div className="item-card__detail-auction">
          <div className="item-card__detail-auction-res">
            {props.item.lastPrice ? (
              <Fragment>
                <span className="item-card__detail-auction-text">
                  Current bid
                </span>
                <span className="auction-text--card">
                  {props.item.lastPrice}฿
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <span className="item-card__detail-auction-text">
                  Reserve bid
                </span>
                <span className="auction-text--card">{props.item.price}฿</span>
              </Fragment>
            )}
          </div>
          <div className="item-card__detail-auction-time">
            <span className="item-card__detail-auction-text">
              Auction ending in
            </span>
            <span className={auctionTextClass}>{timeText}</span>
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
