import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import UserDetail from "./components/detail/userDetail";

const GET_USER = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      id
      email
      name {
        first
        last
      }
      username
      phone
      profile
      kyc {
        idCard
        photo
      }
      status
      products {
        id
        title
        status
        start
        end
      }
    }
  }
`;
function AdminUserDetial(props) {
  const [user, setUser] = useState();
  const { userId } = props;
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
    ssr: false,
    variables: {
      userId: userId,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setUser(data.getUserById);
    }
    if (error) {
      console.log("Error: ", error);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="adminContent">
        <div className="admin__content">Loading...</div>
      </div>
    );
  }
  return (
    <div className="adminContent">
      <div className="admin__content">
        <UserDetail data={user} />
      </div>
    </div>
  );
}

export default AdminUserDetial;
