function Bidder(props) {
  let text = "Bid placed by";
  if (props.info.type == "lister") {
    text = "Listed by";
  }
  return (
    <div className="bidder">
      <div className="bid__profile">
        <div className="bid__profile-box">
          <img
            src={props.info.img}
            alt={props.info.user}
            className="bid__profile-img"
          />
        </div>
      </div>
      <div className="bid__text">
        <div className="bid__text-info">
          {text}
          <a href="#" className="bid__text-info--name">
            @{props.info.user}
          </a>
        </div>
        <div className="bid__text-time">
          {props.info.date} at {props.info.time}
        </div>
      </div>
      <div className="bid__value">
        <div>{props.info.value} ฿</div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
}

export default Bidder;
