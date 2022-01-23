import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import UserInfo from "../../components/pages/profile/user-info";
import { useEffect } from "react";
import BLoading from "../../components/molecules/BLoading/BLoading";

const USER_QUERY = gql`
  query ($getUserByIdUserId: ID!) {
    getUserById(userId: $getUserByIdUserId) {
      name {
        first
        last
      }
      username
      profile
      cover
      desc
      auctionCount {
        auctioning
        auctioned
        bidded
      }
      join
      following {
        id
      }
      followers {
        id
      }
    }
  }
`;

function UserInformationPage() {
  const router = useRouter();
  const { userId } = router.query;

  const { data, loading, error, refetch } = useQuery(USER_QUERY, {
    variables: {
      getUserByIdUserId: userId,
    },
  });

  // useEffect(() => {
  //   refetch();
  // }, []);

  if (loading) {
    return (
      <NoSideLayout>
        <BLoading />
      </NoSideLayout>
    );
  }
  if (error) {
    console.log(error);
    router.push("/404");
    return null;
  }

  const rawData = data.getUserById;
  const user = {
    userId: userId,
    name: rawData.name.first,
    last: rawData.name.last,
    username: rawData.username,
    desc: rawData.desc || "",
    profile:
      rawData.profile ||
      "https://bid-this-storage.s3.ap-southeast-1.amazonaws.com/profile/no-profile-2.png",
    cover: rawData.cover || "",
    join: rawData.join,
    followingCount: rawData.following.length,
    followersCount: rawData.followers.length,
  };

  const auction = rawData.auctionCount;

  return (
    <NoSideLayout>
      <UserInfo userData={user} auctionData={auction} refetch={refetch} />
    </NoSideLayout>
  );
}

export default UserInformationPage;
