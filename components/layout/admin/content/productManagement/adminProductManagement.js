import { useEffect, useState } from "react";
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

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const [productsData, setProductsData] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setProductsData(data.getProducts);
    }
    if (error) {
      console.log("Error: ", error);
    }
  }, [data]);

  useEffect(() => {
    if (userSearchInput.trim().length > 0) {
      const items = [...productsData];
      const usersSearchList = items.filter((product) =>
        product.title.toLowerCase().includes(userSearchInput)
      );
      setSortedList(usersSearchList);
    } else {
      const items = [...productsData];
      setSortedList(items);
    }
  }, [userSearchInput, productsData]);

  useEffect(() => {
    const items = [...sortedList];
    if (selectedFilter === "Product ID") {
      setSortedList(items);
      return;
    }
    if (selectedFilter === "Title") {
      items.sort((a, b) => {
        let fa = a.title.toLowerCase();
        let fb = b.title.toLowerCase();

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
    if (selectedFilter === "Start Date") {
      items.sort((a, b) => {
        let fa = new Date(a.start);
        let fb = new Date(b.start);

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
    if (selectedFilter === "End Date") {
      items.sort((a, b) => {
        let fa = new Date(a.end);
        let fb = new Date(b.end);

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
    if (selectedFilter === "Category") {
      items.sort((a, b) => {
        let fa = a.category;
        let fb = b.category;

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
  }, [selectedFilter, productsData]);

  const productsList = sortedList.map((product) => {
    return <ProductData key={product.id} data={product} />;
  });

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
        {productsData.length > 0 && productsList}
      </div>
    </div>
  );
}

export default AdminProductManagement;
