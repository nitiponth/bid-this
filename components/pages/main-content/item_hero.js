import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import useTimer from "../../../hooks/useTimer";

function ItemHero(props) {
  const router = useRouter();
  const countStart = useTimer(props.item.start);
  const time = useTimer(props.item.endTime);

  const startTime = new Date(props.item.start);
  const endTime = new Date(props.item.endTime);

  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if (endTime < new Date()) {
      setIsEnd(true);
    }
    if (startTime <= new Date()) {
      setIsStart(true);
    }
  }, [endTime, startTime]);

  let timeText = `${countStart.timerHours}h ${countStart.timerMinutes}m ${countStart.timerSeconds}s`;
  if (isStart) {
    if (!isEnd)
      timeText = `${time.timerHours}h ${time.timerMinutes}m ${time.timerSeconds}s`;
    else timeText = `--h --m --s`;
  }

  let auctionTextClass = "auction-text";
  if (time.timerHours == 0 && time.timerMinutes <= 10) {
    auctionTextClass = "auction-text auction-text--red";
  }

  let watchlistsClass = "watchlists__icon";
  if (props.item.watched) {
    watchlistsClass = "watch__icon--red";
  }

  const onPlaceBid = () => {
    if (isStart) router.push(`/items/${props.item.productId}/bid`);
    else router.push(`/items/${props.item.productId}`);
  };

  const link = `/items/${props.item.productId}`;

  return (
    <div className="item-hero">
      <div className="item-hero__img-box">
        <Link href={link}>
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
        <Link href={link}>
          <a className="item-hero__detail-title">{props.item.title}</a>
        </Link>
        <Link href={`/users/${props.item.sellerId}`}>
          <a className="item-hero__detail-seller">
            <span className="at-sign">@</span>
            {props.item.seller}
          </a>
        </Link>
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
              {isStart ? "Auction ending in" : "Auction will start in"}
            </span>
            <span className={auctionTextClass}>{timeText}</span>
          </div>
        </div>

        <a onClick={onPlaceBid} className="btn">
          {isStart && !isEnd ? "Place a bid" : "Watch product"}
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
