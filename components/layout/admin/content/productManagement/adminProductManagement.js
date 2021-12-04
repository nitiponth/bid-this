import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import SelectionBox from "../../../../etc/selection/selection";
import ProductData from "./components/productData";

const filterOptions = ["Sort by A", "Sort by B", "Sort by C", "Sort by D"];

const GET_USERS = gql`
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
  const [selectedFilter, setSelectedFilter] = useState("Select Filter");
  const { loading, error, data } = useQuery(GET_USERS);

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setProductsData(data?.getProducts);
    }
    if (error) {
      console.log("Error: ", error);
    }
  }, [data]);

  const productsList = productsData.map((product) => {
    return <ProductData key={product.id} data={product} />;
  });

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
        {loading && <div className="centered">Loading...</div>}
        {productsData.length > 0 && productsList}
      </div>
    </div>
  );
}

export default AdminProductManagement;
