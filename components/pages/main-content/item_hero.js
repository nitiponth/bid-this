import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import useTimer from "../../../hooks/useTimer";
import { useWatchlistStore } from "../../../store/watchlist-store";
import AuthContext from "../../../store/auth-context";
import LayoutContext from "../../../store/layout-context";
import BModalCard from "../../atoms/BModalCard/BModalCard";

const ADD_TO_WATHCLIST = gql`
  mutation ($watchedArr: [ID]!) {
    addToWatchlists(watchedArr: $watchedArr) {
      watchlists {
        id
      }
    }
  }
`;

function ItemHero(props) {
  const authCtx = useContext(AuthContext);
  const layoutCtx = useContext(LayoutContext);
  const [addToWatchlists] = useMutation(ADD_TO_WATHCLIST);

  const { toggleProductWatched, watchlist } = useWatchlistStore();
  const router = useRouter();
  const countStart = useTimer(props.item.start);
  const time = useTimer(props.item.endTime);

  const startTime = new Date(props.item.start);
  const endTime = new Date(props.item.endTime);

  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    if (endTime < new Date()) {
      setIsEnd(true);
    }
    if (startTime <= new Date()) {
      setIsStart(true);
    }
  }, [endTime, startTime]);

  let timeText = ` ${countStart.timerHours}h ${countStart.timerMinutes}m ${countStart.timerSeconds}s`;

  if (countStart.timerDays > 0) {
    timeText = `${countStart.timerDays}d ${countStart.timerHours}h ${countStart.timerMinutes}m`;
  }

  if (isStart) {
    if (!isEnd)
      timeText = `${time.timerHours}h ${time.timerMinutes}m ${time.timerSeconds}s`;
    else timeText = `--h --m --s`;
  }

  let auctionTextClass = "auction-text";
  if (time.timerHours == 0 && time.timerMinutes <= 10) {
    auctionTextClass = "auction-text auction-text--red";
  }

  useEffect(() => {
    if (!props.item.productId) {
      return;
    }
    if (!watchlist) {
      return;
    }

    const idx = watchlist?.slice().indexOf(props.item.productId);
    if (idx === -1) {
      setIsWatched(false);
    } else {
      setIsWatched(true);
    }
  }, [watchlist.slice()]);

  const watchClickedHandler = async () => {
    toggleProductWatched(props.item.productId);
    const { data, errors } = await addToWatchlists({
      variables: {
        watchedArr: watchlist.slice(),
      },
    });
    if (data) {
      // console.log(data);
    } else {
      console.log(errors);
    }
  };

  let watchlistsClass = "watchlists__icon";
  if (isWatched) {
    watchlistsClass = "watchlists__icon watch__icon--red";
  }

  const onPlaceBid = () => {
    if (!authCtx.isLogin) {
      router.push(`/items/${props.item.productId}`);
      return;
    }

    if (isStart) {
      layoutCtx.setProductId(props.item.productId);
      layoutCtx.setModalType("bid");
    } else {
      router.push(`/items/${props.item.productId}`);
    }
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
                <span className="auction-text">
                  {props.item.lastPrice.toLocaleString()}฿
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <span className="item-hero__detail-auction-text">
                  Reserve bid
                </span>
                <span className="auction-text">
                  {props.item.price.toLocaleString()}฿
                </span>
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
          {!authCtx.isLogin
            ? "Watch product"
            : isStart && !isEnd
            ? "Place a bid"
            : "Watch product"}
        </a>

        {authCtx.isLogin && (
          <div className="watchlists--hero">
            <div className="watch__icon-box">
              <img
                src="/images/SVG/heart-outlined.svg"
                alt="bookmark img"
                className={watchlistsClass}
                onClick={watchClickedHandler}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemHero;
