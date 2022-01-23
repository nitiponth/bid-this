import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { useFollowStore } from "../../../../store/follow-store";

function Follower({
  followerId,
  img,
  username,
  desc,
  isFollow = false,
  isMe = false,
  refetch,
  onClose,
}) {
  const router = useRouter();
  const { toggleFollowing } = useFollowStore();
  const [isFollowing, setIsFollowing] = useState(isFollow);

  const userId = followerId.toString();

  return (
    <div
      onClick={() => {
        router.push(`/users/${userId}`);
        onClose();
        refetch();
      }}
      className="follower"
    >
      <div className="follower__img" style={{ marginRight: "10px" }}>
        <Image
          src={img}
          width={48}
          height={48}
          objectFit="cover"
          alt="profile"
        />
      </div>
      <div className="follower__body">
        <div className="follower__username">@{username}</div>
        {desc && <div className="follower__desc">{desc}</div>}
      </div>
      {!isMe && (
        <Fragment>
          {isFollowing && (
            <div
              onClick={(e) => {
                setIsFollowing(false);
                toggleFollowing(userId);
                e.stopPropagation();
              }}
              className="follower__button follower__button--unfollow"
            >
              Unfollow
            </div>
          )}
          {!isFollowing && (
            <div
              onClick={(e) => {
                setIsFollowing(true);
                toggleFollowing(userId);
                e.stopPropagation();
              }}
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
