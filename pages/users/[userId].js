import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import NoSideLayout from "../../components/layout/no-sidebar-layout/no-sidebar-layout";
import UserInfo from "../../components/pages/profile/user-info";
import BLoading from "../../components/molecules/BLoading/BLoading";
import { Fragment } from "react";
import Head from "next/head";

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
      <Fragment>
        <Head>
          <title>Loading...</title>
          <meta
            name="description"
            content="Buy the product at the price you choose."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NoSideLayout>
          <BLoading />
        </NoSideLayout>
      </Fragment>
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
    <Fragment>
      <Head>
        <title>{rawData.username || "BidThis"}</title>
        <meta
          name="description"
          content="Buy the product at the price you choose."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoSideLayout>
        <UserInfo userData={user} auctionData={auction} refetch={refetch} />
      </NoSideLayout>
    </Fragment>
  );
}

export default UserInformationPage;
