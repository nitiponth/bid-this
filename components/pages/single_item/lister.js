function Lister(props) {
  return (
    <div className="bidder">
      <div className="bid__profile">
        <a href="#">
          <div className="bid__profile-box">
            <img
              src={props.avatar || "/images/users/no-profile.jpg"}
              alt={props.username}
              className="bid__profile-img"
            />
          </div>
        </a>
      </div>
      <div className="bid__text">
        <div className="bid__text-info">
          Listed by
          <a href="#" className="bid__text-info--name">
            @{props.username}
          </a>
        </div>
        <div className="bid__text-time">
          {new Date(props.listTime).toLocaleDateString()} at{" "}
          {new Date(props.listTime).toLocaleTimeString()}
        </div>
      </div>
      <div className="bid__value">
        <div>{props.resPrice} ฿</div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
}

export default Lister;
