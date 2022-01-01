import { useCallback, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import SelectionBox from "../../../../etc/selection/selection";
import ProductData from "./components/productData";

const filterOptions = [
  "Product ID",
  "Title",
  "Category",
  "Start Date",
  "End Date",
];

const sortOptions = {
  id: "Product ID",
  title: "Title",
  category: "Category",
  start: "Start Date",
  end: "End Date",
};

const GET_PRODUCTS = gql`
  query {
    getProducts {
      id
      title
      images
      seller {
        id
        username
      }
      price {
        initial
        current
      }
      category
      createdAt
      start
      end
      status
    }
  }
`;

function AdminProductManagement() {
  const [selectedFilter, setSelectedFilter] = useState("Product ID");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [listComponents, setListComponents] = useState(null);
  const [filteredComponents, setFilteredComponents] = useState(null);

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const initialize = useCallback(() => {
    if (!loading && data) {
      const { getProducts } = data;

      const productsList = getProducts.map((product) => (
        <ProductData key={product.id} data={product} />
      ));

      setListComponents(productsList);
    }
  }, [data, error, loading]);

  useEffect(() => {
    initialize();
  }, [data, error, loading]);

  const sortFunction = (arr) => {
    const compArr = [...arr];

    return compArr.sort((a, b) => {
      let fa = a.props.data.id;
      let fb = b.props.data.id;

      if (selectedFilter === sortOptions.title) {
        fa = a.props.data.title.toLowerCase();
        fb = b.props.data.title.toLowerCase();
      } else if (selectedFilter === sortOptions.category) {
        fa = a.props.data.category.toLowerCase();
        fb = b.props.data.category.toLowerCase();
      } else if (selectedFilter === sortOptions.start) {
        fa = new Date(a.props.data.start);
        fb = new Date(b.props.data.start);
      } else if (selectedFilter === sortOptions.end) {
        fa = new Date(a.props.data.end);
        fb = new Date(b.props.data.end);
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
      //sort in filtered list
      const filteredArr = sortFunction(filteredComponents);
      setFilteredComponents(filteredArr);
    }

    //sort in global list
    const listArr = sortFunction(listComponents);
    setListComponents(listArr);
  }, [selectedFilter]);

  useEffect(() => {
    if (userSearchInput.trim().length > 0) {
      const list = [...listComponents];

      const filteredList = list.filter((product) => {
        return product.props.data.title
          .toLowerCase()
          .includes(userSearchInput.toLocaleLowerCase().trim());
      });

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
          <p className="label"> Sort by </p>
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

export default AdminProductManagement;
