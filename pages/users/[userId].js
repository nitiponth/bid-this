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
      products {
        id
        title
        seller {
          username
        }
        desc
        price {
          initial
          current
        }
        end
      }
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
    profile: rawData.profile ? rawData.profile : "/images/users/no-profile.jpg",
    cover: rawData.cover ? rawData.cover : "",
  };

  const products = rawData.products;

  return (
    <NoSideLayout>
      <UserInfo userData={user} productsData={products} />
    </NoSideLayout>
  );
}

export default UserInformationPage;
