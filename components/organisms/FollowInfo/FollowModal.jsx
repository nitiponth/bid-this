import { Fragment } from "react/cjs/react.production.min";
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useFollowStore } from "../../../store/follow-store";
import AuthContext from "../../../store/auth-context";
import Backdrop from "../../layout/backdrop";
import Follower from "./components/Follower";
import FollowHeader from "./components/FollowHeader";
import BLoading from "../../molecules/BLoading/BLoading";

const GET_FOLLOWER = gql`
  query ($userId: ID!) {
    getFollowData(userId: $userId) {
      followers {
        desc
        id
        profile
        username
      }
      followings {
        desc
        id
        profile
        username
      }
    }
  }
`;

function FollowModal({ active, onClose, userId, initialTopic }) {
  const [isLoading, setIsLoading] = useState(true);
  const { following } = useFollowStore();
  const authCtx = useContext(AuthContext);
  const { loading, data, error, refetch } = useQuery(GET_FOLLOWER, {
    ssr: false,
    fetchPolicy: "network-only",
    variables: { userId },
  });
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);

  useEffect(() => {
    setSelectedTopic(initialTopic);
  }, [initialTopic]);

  useEffect(() => {
    if (!loading && data) {
      setIsLoading(false);
    }
    if (error) {
      console.log(error);
    }
  }, [data, loading, error]);

  useEffect(() => {
    refetch();
  }, [selectedTopic]);

  const followers = data?.getFollowData?.followers?.map((follower) => {
    const isFollowMe = following?.find((user) => user === follower.id);
    const isMe = follower.id === authCtx?.user?.id;

    return (
      <Follower
        desc={follower.desc}
        followerId={follower.id}
        img={follower.profile}
        isFollow={!!isFollowMe}
        isMe={isMe}
        key={follower.id}
        onClose={onClose}
        refetch={refetch}
        username={follower.username}
      />
    );
  });
  const followingList = data?.getFollowData?.followings?.map((user) => {
    const isMe = user.id === authCtx?.user?.id;

    return (
      <Follower
        desc={user.desc}
        followerId={user.id}
        img={user.profile}
        isFollow={true}
        isMe={isMe}
        key={user.id}
        onClose={onClose}
        refetch={refetch}
        username={user.username}
      />
    );
  });

  return (
    <Backdrop
      show={active}
      onClose={() => {
        onClose();
        refetch();
      }}
    >
      <div className="followModal">
        <FollowHeader
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        <div className="followModal__list">
          {isLoading ? (
            <BLoading />
          ) : (
            <Fragment>
              {selectedTopic === "Followers" && followers}
              {selectedTopic === "Following" && followingList}
            </Fragment>
          )}
        </div>
      </div>
    </Backdrop>
  );
}

export default FollowModal;
