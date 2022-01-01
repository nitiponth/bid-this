import { useCallback, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import UserData from "./components/userData";
import SelectionBox from "../../../../etc/selection/selection";

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

const filterOptions = ["User ID", "Username", "Email", "Status"];

const sortOptions = {
  id: "User ID",
  username: "Username",
  email: "Email",
  status: "Status",
};

function AdminUserManagement() {
  const [selectedFilter, setSelectedFilter] = useState("User ID");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [listComponents, setListComponents] = useState(null);
  const [filteredComponents, setFilteredComponents] = useState(null);

  const { loading, error, data } = useQuery(GET_USERS);

  const [usersData, setUsersData] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  const initialize = useCallback(() => {
    if (!loading && data) {
      const { getUsers } = data;

      const productsList = getUsers.map((user) => (
        <UserData key={user.id} data={user} />
      ));

      setListComponents(productsList);
    }
  }, [data, error, loading]);

  useEffect(() => {
    initialize();
  }, [data, loading, error]);

  const sortFunction = (arr) => {
    const compArr = [...arr];

    return compArr.sort((a, b) => {
      let fa = a.props.data.id;
      let fb = b.props.data.id;

      if (selectedFilter === sortOptions.username) {
        fa = a.props.data.username.toLowerCase();
        fb = b.props.data.username.toLowerCase();
      } else if (selectedFilter === sortOptions.email) {
        fa = a.props.data.email.toLowerCase();
        fb = b.props.data.email.toLowerCase();
      } else if (selectedFilter === sortOptions.status) {
        fa = new Date(a.props.data.status);
        fb = new Date(b.props.data.status);
      }

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  };

  const sortList = useCallback(() => {
    if (!listComponents) {
      return;
    }

    if (filteredComponents) {
      const filteredArr = sortFunction(filteredComponents);
      setFilteredComponents(filteredArr);
    }

    const listArr = sortFunction(listComponents);
    setListComponents(listArr);
  }, [selectedFilter]);

  useEffect(() => {
    if (userSearchInput.trim().length > 0) {
      const list = [...listComponents];

      const filteredList = list.filter((user) =>
        user.props.data.username
          .toLowerCase()
          .includes(userSearchInput.toLowerCase().trim())
      );
      setFilteredComponents(filteredList);
    } else {
      setFilteredComponents(null);
    }
  }, [userSearchInput]);

  useEffect(() => {
    sortList();
  }, [selectedFilter]);

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
        {data && !error && !filteredComponents && listComponents}
        {filteredComponents && filteredComponents}
      </div>
    </div>
  );
}

export default AdminUserManagement;
