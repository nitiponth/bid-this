import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/dist/client/link";
import useTimer from "../../../hooks/useTimer";
import { useWatchlistStore } from "../../../store/watchlist-store";
import { observer } from "mobx-react-lite";
import { gql, useMutation } from "@apollo/client";
import AuthContext from "../../../store/auth-context";
import { useRouter } from "next/router";
import LayoutContext from "../../../store/layout-context";

const ADD_TO_WATHCLIST = gql`
  mutation ($watchedArr: [ID]!) {
    addToWatchlists(watchedArr: $watchedArr) {
      watchlists {
        id
      }
    }
  }
`;

function ItemCard(props) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const layoutCtx = useContext(LayoutContext);
  const [addToWatchlists] = useMutation(ADD_TO_WATHCLIST);

  const { watchlist, toggleProductWatched } = useWatchlistStore();
  const time = useTimer(props.item.endTime);
  const countStart = useTimer(props.item.start);

  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const startTime = new Date(props.item.start);
  const endTime = new Date(props.item.endTime);

  useEffect(() => {
    if (endTime < new Date()) {
      setIsEnd(true);
    }

    if (new Date(startTime).toISOString() <= new Date().toISOString()) {
      setIsStart(true);
    }
  }, [endTime, startTime]);

  let timeText = `${countStart.timerHours}h ${countStart.timerMinutes}m ${countStart.timerSeconds}s`;

  if (countStart.timerDays > 0) {
    timeText = `${countStart.timerDays}d ${countStart.timerHours}h ${countStart.timerMinutes}m`;
  }

  if (isStart) {
    if (!isEnd)
      timeText = `${time.timerHours}h ${time.timerMinutes}m ${time.timerSeconds}s`;
    else timeText = `--h --m --s`;
  }

  let auctionTextClass = "auction-text--card";

  if (time.timerHours == 0 && time.timerMinutes <= 14) {
    auctionTextClass = "auction-text--card";
  }

  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    if (!props.item.productId) {
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
      console.log(data);
    } else {
      console.log(errors);
    }
  };

  let watchlistsClass = "watchlists__icon";
  if (isWatched) {
    watchlistsClass = "watchlists__icon watch__icon--red";
  }
  const onPlaceBid = () => {
    if (!authCtx.isLogin || authCtx.user.status === "GUEST") {
      router.push(`/items/${props.item.productId}`);
      return;
    }

    if (isStart) {
      layoutCtx.setModalType("bid");
      layoutCtx.setProductId(props.item.productId);
      // router.push(`/items/${props.item.productId}/bid`);
    } else {
      router.push(`/items/${props.item.productId}`);
    }
  };

  const link = `/items/${props.item.productId}`;

  return (
    <div className="item-card">
      {authCtx.isLogin && (
        <div className="watchlists--card">
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
        <a
          href="#"
          onClick={() => router.push(`/users/${props.item.sellerId}`)}
          className="item-card__detail-seller hover__pointer"
        >
          <span className="at-sign">@</span>
          {props.item.seller}
        </a>
        <p className="item-card__detail-desc">{props.item.desc}</p>
        <div className="item-card__detail-auction">
          <div className="item-card__detail-auction-res">
            {props.item.lastPrice ? (
              <Fragment>
                <span className="item-card__detail-auction-text">
                  Current bid
                </span>
                <span className="auction-text--card">
                  {props.item.lastPrice.toLocaleString()}฿
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <span className="item-card__detail-auction-text">
                  Reserve bid
                </span>
                <span className="auction-text--card">
                  {props.item.price.toLocaleString()}฿
                </span>
              </Fragment>
            )}
          </div>
          <div className="item-card__detail-auction-time">
            <span className="item-card__detail-auction-text">
              {isStart ? "Auction ending in" : "AUCTION START IN"}
            </span>
            <span className={auctionTextClass}>{timeText}</span>
          </div>
        </div>

        <a onClick={onPlaceBid} className="btn--card">
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

export default observer(ItemCard);
