import { useContext, useEffect, useState } from "react";
import Backdrop from "../../layout/backdrop";
import FollowHeader from "./components/FollowHeader";
import Follower from "./components/Follower";
import { gql, useQuery } from "@apollo/client";
import { Fragment } from "react/cjs/react.production.min";
import BLoading from "../../atoms/BLoading/BLoading";
import { useFollowStore } from "../../../store/follow-store";
import AuthContext from "../../../store/auth-context";

const GET_FOLLOWER = gql`
  query ($userId: ID!) {
    getFollowData(userId: $userId) {
      followers {
        id
        profile
        username
        desc
      }
      followings {
        id
        profile
        username
        desc
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

  console.log(selectedTopic);

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
        key={follower.id}
        followerId={follower.id}
        img={follower.profile}
        username={follower.username}
        desc={follower.desc}
        isFollow={!!isFollowMe}
        isMe={isMe}
        refetch={refetch}
        onClose={onClose}
      />
    );
  });
  const followingList = data?.getFollowData?.followings?.map((user) => {
    const isMe = user.id === authCtx?.user?.id;

    return (
      <Follower
        key={user.id}
        followerId={user.id}
        img={user.profile}
        username={user.username}
        desc={user.desc}
        isFollow={true}
        isMe={isMe}
        refetch={refetch}
        onClose={onClose}
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
