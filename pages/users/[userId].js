import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import UserInfo from "../../components/pages/profile/user-info";

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
    }
  }
`;

function UserInformationPage() {
  const router = useRouter();
  const { userId } = router.query;

  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: {
      getUserByIdUserId: userId,
    },
  });

  if (loading) return null;
  //   if (error) return router.push("/404");
  if (error) return `Error! ${error}`;

  // console.log(data.getUserById);
  const rawData = data.getUserById;
  const user = {
    userId: userId,
    name: rawData.name.first,
    last: rawData.name.last,
    username: rawData.username,
    desc: rawData.desc ? rawData.desc : "",
    profile: rawData.profile
      ? rawData.profile
      : "/images/users/no-profile-2.png",
    cover: rawData.cover ? rawData.cover : "",
    join: rawData.join,
  };

  const auction = rawData.auctionCount;

  return (
    <NoSideLayout>
      <UserInfo userData={user} auctionData={auction} />
    </NoSideLayout>
  );
}

export default UserInformationPage;
