import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import useTimer from "../../../hooks/useTimer";
import LayoutContext from "../../../store/layout-context";
import ItemsDropdown from "../../dropdown/items-dropdown/items-dropdown";
import PopupItem from "../../dropdown/profile-dropdown/profile-dropdown-item";
import Slider from "../../slider/slider";

import Bidder from "./bidder";
import Lister from "./lister";

function SingleItem(props) {
  const countStart = useTimer(props.item.start);
  const countEnd = useTimer(props.item.endTime);
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

  const bidData = [...props.bidInfo].sort(
    (a, b) => new Date(b.bidTime) - new Date(a.bidTime)
  );

  const bidders = bidData.map((bidder) => {
    return <Bidder info={bidder} key={bidder.id || ""} />;
  });

  const policy = props.item.policy.map((item, index) => (
    <li className="item__desc-services--list" key={index}>
      {item}
    </li>
  ));

  return (
    <div className="single-item">
      <div className="section__img">
        <Slider items={props.item.images} />
      </div>
      <div className="floatbox">
        <div className="floatbox--title">{props.item.title}</div>
        <div className="floatbox--seller">
          <Link href={`/users/${props.item.sellerId}`}>
            <a className="floatbox--seller--link">
              <span className="at-sign at-sign--md">@</span>
              {props.item.seller}
            </a>
          </Link>
        </div>
        <div className="floatbox--popup">
          <PopupItem
            icon="/images/SVG/dots-three-horizontal.svg"
            style="floatbox--popup-img"
          >
            <ItemsDropdown />
          </PopupItem>
        </div>
      </div>
      <div className="section__content">
        <div className="item__desc">
          <label className="glabel">Description</label>
          <div className="item__desc-text">{props.item.desc}</div>
          <label className="glabel">Condition</label>
          <div className="item__desc-delivery">
            <span className="item__desc-delivery--com">
              {props.item.condition}
            </span>
          </div>
          <label className="glabel">Delivery</label>
          <div className="item__desc-delivery">
            <span className="item__desc-delivery--com">
              {props.item.shipping}
            </span>
          </div>

          <label className="glabel">Warranty Policy</label>
          <ul className="item__desc-services">{policy}</ul>
        </div>
        <div className="item__auction">
          <div className="item__bidding">
            <div className="item__bidding-bid">
              {props.item.current ? (
                <label className="glabel">Current bid</label>
              ) : (
                <label className="glabel">Reserve Price</label>
              )}
              <div className="item__bidding-bid--price">
                {props.item.current ? props.item.current : props.item.resPrice}{" "}
                ฿
              </div>
            </div>
            <div className="item__bidding-time">
              {isStart ? (
                <Fragment>
                  {isEnd && (
                    <label className="glabel">The auction has ended</label>
                  )}
                  {!isEnd && (
                    <label className="glabel">Auction ending in</label>
                  )}
                  <div className="item__bidding-time-box">
                    <div className="item__bidding-time--text">
                      {!isEnd ? `${countEnd.timerHours}` : `-- `}h
                    </div>
                    <div className="item__bidding-time--text">
                      {!isEnd ? `${countEnd.timerMinutes}` : `-- `}m
                    </div>
                    <div className="item__bidding-time--text">
                      {!isEnd ? `${countEnd.timerSeconds}` : `-- `}s
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <label className="glabel">Auction will start in</label>
                  <div className="item__bidding-time-box">
                    {countStart.timerDays > 0 && (
                      <div className="item__bidding-time--text">
                        {countStart.timerDays}d
                      </div>
                    )}

                    <div className="item__bidding-time--text">
                      {countStart.timerHours}h
                    </div>
                    <div className="item__bidding-time--text">
                      {countStart.timerMinutes}m
                    </div>
                    {countStart.timerDays <= 0 && (
                      <div className="item__bidding-time--text">
                        {countStart.timerSeconds}s
                      </div>
                    )}
                  </div>
                </Fragment>
              )}
            </div>
            <div className="item__bidding-btn">
              {!isEnd && isStart ? (
                <Link href={`/items/${props.item.productId}/bid`}>
                  <a className="btn btn--single-item">Place a bid</a>
                </Link>
              ) : (
                <a className="btn btn--single-item btn--disabled-place">
                  Place a bid
                </a>
              )}
            </div>
          </div>

          <label className="glabel glabel--title">Activity</label>

          <div className="item__activity">
            {bidders}
            <Lister
              username={props.item.seller}
              resPrice={props.item.resPrice}
              listTime={props.item.createdAt}
              avatar={props.item.avatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;
