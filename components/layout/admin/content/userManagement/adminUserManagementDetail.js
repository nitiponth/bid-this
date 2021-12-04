import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_USER = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      id
      email
      username
      kyc {
        idCard
        photo
      }
      status
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
        {user?.id} {"\n"}
        {user?.email} {"\n"}
        {user?.username}
      </div>
    </div>
  );
}

export default AdminUserDetial;
