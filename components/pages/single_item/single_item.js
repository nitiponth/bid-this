import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useTimer from "../../../hooks/useTimer";
import LayoutContext from "../../../store/layout-context";
import ItemsDropdown from "../../dropdown/items-dropdown/items-dropdown";
import PopupItem from "../../dropdown/profile-dropdown/profile-dropdown-item";
import Slider from "../../slider/slider";

import Bidder from "./bidder";

function SingleItem(props) {
  const layoutCtx = useContext(LayoutContext);

  const time = useTimer(props.item.endTime);
  const endTime = new Date(props.item.endTime);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (endTime < new Date()) {
      setIsEnd(true);
    }
  }, [endTime]);

  const onPlaceBid = () => {
    layoutCtx.setAuth(true);
    layoutCtx.setType("bid");
  };

  const bidData = [...props.bidInfo].sort(
    (a, b) => new Date(b.bidTime) - new Date(a.bidTime)
  );

  const bidders = bidData.map((bidder) => {
    return <Bidder info={bidder} />;
  });

  return (
    <div className="single-item">
      <div className="section__img">
        <Slider items={props.item.images} />
      </div>
      <div className="floatbox">
        <div className="floatbox--title">{props.item.title}</div>
        <div className="floatbox--seller">
          <Link href="/users">
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
          <label className="glabel">Delivery</label>
          <div className="item__desc-delivery">
            <span className="item__desc-delivery--com">{"dhl"}</span>
            <span className="item__desc-delivery--price">({"120"}฿)</span>
          </div>

          <label className="glabel">Services</label>
          <ul className="item__desc-services">
            <li className="item__desc-services--list">
              7 days return to seller
            </li>
            <li className="item__desc-services--list">
              1 Month Warranty by Seller
            </li>
          </ul>
        </div>
        <div className="item__auction">
          <div className="item__bidding">
            <div className="item__bidding-bid">
              {!isEnd ? (
                <label className="glabel">Current bid</label>
              ) : (
                <label className="glabel">End Price</label>
              )}
              <div className="item__bidding-bid--price">
                {props.item.resPrice} ฿
              </div>
            </div>
            <div className="item__bidding-time">
              <label className="glabel">Auction ending in</label>
              <div className="item__bidding-time-box">
                <div className="item__bidding-time--text">
                  {!isEnd ? `${time.timerHours}` : `-- `}h
                </div>
                <div className="item__bidding-time--text">
                  {!isEnd ? `${time.timerMinutes}` : `-- `}m
                </div>
                <div className="item__bidding-time--text">
                  {!isEnd ? `${time.timerSeconds}` : `-- `}s
                </div>
              </div>
            </div>
            <div className="item__bidding-btn">
              {!isEnd ? (
                <a onClick={onPlaceBid} className="btn btn--single-item">
                  Place a bid
                </a>
              ) : (
                <a
                  onClick={onPlaceBid}
                  className="btn btn--single-item btn--disabled-place"
                >
                  Place a bid
                </a>
              )}
            </div>
          </div>

          <label className="glabel glabel--title">Activity</label>

          <div className="item__activity">{bidders}</div>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;
