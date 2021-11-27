import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SelectionBox from "../../../etc/selection/selection";
import UserData from "./userComponent/userData";

const filterOptions = ["Sort by A", "Sort by B", "Sort by C", "Sort by D"];

const GET_USERS = gql`
  query {
    getUsers {
      id
      email
      name {
        first
        last
      }
      kyc {
        idCard
        photo
      }
      profile
      status
    }
  }
`;

function AdminUserManagement() {
  const [selectedFilter, setSelectedFilter] = useState("Select Filter");

  const { loading, error, data } = useQuery(GET_USERS);

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setUsersData(data?.getUsers);
    }
    if (error) {
      console.log("error! ", error);
    }
  }, [data]);

  const usersList = usersData.map((user) => (
    <UserData key={user.id} data={user} />
  ));

  return (
    <div className="adminContent">
      <div className="admin__header">
        <div className="header__search">
          <input className="header__search__input" placeholder="Search..." />
        </div>
        <div className="header__filter">
          <p className="label"> Filter </p>
          <div className="header__filter__selection">
            <SelectionBox
              options={filterOptions}
              selected={selectedFilter}
              setSelected={setSelectedFilter}
            />
          </div>
        </div>
      </div>
      <div className="admin__content">
        {loading && <div>Loading...</div>}
        {usersData.length > 0 && usersList}
      </div>
    </div>
  );
}

export default AdminUserManagement;
