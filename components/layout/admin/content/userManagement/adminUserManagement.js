import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import UserData from "./components/userData";
import SelectionBox from "../../../../etc/selection/selection";

const filterOptions = ["User ID", "Username", "Email", "Status"];

const GET_USERS = gql`
  query {
    getUsers {
      id
      username
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
  const [selectedFilter, setSelectedFilter] = useState("User ID");
  const [userSearchInput, setUserSearchInput] = useState("");

  const { loading, error, data } = useQuery(GET_USERS);

  const [usersData, setUsersData] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setUsersData(data.getUsers);
    }
    if (error) {
      console.log("Error: ", error);
    }
  }, [data]);

  useEffect(() => {
    if (userSearchInput.trim().length > 0) {
      const items = [...usersData];
      const usersSearchList = items.filter((user) =>
        user.username.toLowerCase().includes(userSearchInput)
      );
      setSortedList(usersSearchList);
    } else {
      const items = [...usersData];
      setSortedList(items);
    }
  }, [userSearchInput, usersData]);

  useEffect(() => {
    const items = [...sortedList];
    if (selectedFilter === "User ID") {
      setSortedList(items);
      return;
    }
    if (selectedFilter === "Username") {
      items.sort((a, b) => {
        let fa = a.username.toLowerCase();
        let fb = b.username.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setSortedList(items);
      return;
    }
    if (selectedFilter === "Email") {
      items.sort((a, b) => {
        let fa = a.email;
        let fb = b.email;

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setSortedList(items);
      return;
    }
    if (selectedFilter === "Status") {
      items.sort((a, b) => {
        let fa = a.status;
        let fb = b.status;

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setSortedList(items);
      return;
    }
  }, [selectedFilter]);

  const usersList = sortedList.map((user) => (
    <UserData key={user.id} data={user} />
  ));

  return (
    <div className="adminContent">
      <div className="admin__header">
        <div className="header__search">
          <input
            className="header__search__input"
            placeholder="Search..."
            value={userSearchInput}
            onChange={(e) => setUserSearchInput(e.target.value)}
          />
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
        {loading && <div className="centered">Loading...</div>}
        {usersData.length > 0 && usersList}
      </div>
    </div>
  );
}

export default AdminUserManagement;
