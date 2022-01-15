import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";

function Follower({ img, username, desc, isFollow = false, isMe = false }) {
  const [isFollowing, setIsFollowing] = useState(isFollow);

  return (
    <div className="follower">
      <img src={img} className="follower__img" />
      <div className="follower__body">
        <div className="follower__username">@{username}</div>
        {desc && <div className="follower__desc">{desc}</div>}
      </div>
      {!isMe && (
        <Fragment>
          {isFollowing && (
            <div
              onClick={() => setIsFollowing(false)}
              className="follower__button follower__button--unfollow"
            >
              Unfollow
            </div>
          )}
          {!isFollowing && (
            <div
              onClick={() => setIsFollowing(true)}
              className="follower__button"
            >
              Follow
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default Follower;
