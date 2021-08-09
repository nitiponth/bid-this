import Bidder from "./bidder";

const DUMMY_INFO = [
  {
    img: "/images/users/user4.jpg",
    user: "katerine",
    date: "Jun 2, 2021",
    time: "9:18pm",
    value: 1000,
    type: "lister",
  },
  {
    img: "/images/users/user2.jpg",
    user: "oizo3000",
    date: "Jun 2, 2021",
    time: "9:32pm",
    value: 1200,
    type: "bidder",
  },
  {
    img: "/images/users/user3.jpg",
    user: "nikita",
    date: "Jun 2, 2021",
    time: "9:40pm",
    value: 1800,
    type: "bidder",
  },
  {
    img: "/images/users/user1.jpg",
    user: "cassiopeus",
    date: "Jun 2, 2021",
    time: "10:11pm",
    value: 1990,
    type: "bidder",
  },
];

function SingleItem() {
  return (
    <div className="single-item">
      <div className="section__img">
        <img
          src="/images/items/keyboard.jpg"
          alt="keychron"
          className="item__img"
        />
      </div>
      <div className="floatbox">
        <div className="floatbox--title">Keychron K4 V2</div>
        <div className="floatbox--seller">
          <a href="#" className="floatbox--seller--link">
            <span className="at-sign">@</span>
            gorgias
          </a>
        </div>
        <div className="floatbox--popup">
          <img
            src="images/SVG/dots-three-horizontal.svg"
            alt="three dot"
            className="floatbox--popup-img"
          />
        </div>
      </div>
      <div className="section__content">
        <div className="item__desc">
          <label className="glabel">Description</label>
          <div className="item__desc-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere
            rhoncus purus, malesuada interdum orci molestie efficitur. Sed at
            dui elit. Suspendisse ultrices justo et ante varius pretium.
            Maecenas non.
          </div>
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
              <label className="glabel">Current bid</label>
              <div className="item__bidding-bid--price">{"1990"} ฿</div>
            </div>
            <div className="item__bidding-time">
              <label className="glabel">Auction ending in</label>
              <div className="item__bidding-time-box">
                <div className="item__bidding-time--text">{"2"}h</div>
                <div className="item__bidding-time--text">{"11"}m</div>
                <div className="item__bidding-time--text">{"32"}s</div>
              </div>
            </div>
            <div className="item__bidding-btn">
              <a href="#" className="btn btn--single-item">
                Place a bid
              </a>
            </div>
          </div>

          <label className="glabel glabel--title">Activity</label>

          <div className="item__activity">
            <Bidder info={DUMMY_INFO[3]} />
            <Bidder info={DUMMY_INFO[2]} />
            <Bidder info={DUMMY_INFO[1]} />
            <Bidder info={DUMMY_INFO[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;
