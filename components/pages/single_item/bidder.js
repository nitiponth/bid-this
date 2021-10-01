function Bidder(props) {
  return (
    <div className="bidder">
      <div className="bid__profile">
        <a href="#">
          <div className="bid__profile-box">
            <img
              src="/images/users/user1.jpg"
              alt={props.info.bidder.username}
              className="bid__profile-img"
            />
          </div>
        </a>
      </div>
      <div className="bid__text">
        <div className="bid__text-info">
          Bid placed by
          <a href="#" className="bid__text-info--name">
            @{props.info.bidder.username}
          </a>
        </div>
        <div className="bid__text-time">
          {new Date(props.info.bidTime).toLocaleDateString()} at{" "}
          {new Date(props.info.bidTime).toLocaleTimeString()}
        </div>
      </div>
      <div className="bid__value">
        <div>{props.info.bidPrice} ฿</div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
}

export default Bidder;
