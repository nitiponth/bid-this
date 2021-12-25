import React from "react";
import Link from "next/dist/client/link";

const Lister = (props) => {
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
          <Link href={`/users/${props.userId}`}>
            <a className="bid__text-info--name">@{props.username}</a>
          </Link>
        </div>
        <div className="bid__text-time">
          {new Date(props.listTime).toLocaleDateString()} at{" "}
          {new Date(props.listTime).toLocaleTimeString()}
        </div>
      </div>
      <div className="bid__value">
        <div>{props.resPrice.toLocaleString()} ฿</div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
};

export default Lister;
