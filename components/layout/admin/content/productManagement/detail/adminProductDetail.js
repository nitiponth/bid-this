import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ProductDetail from "./components/productDetail";

const GET_PROD_BY_ID = gql`
  query ($productId: ID!) {
    getProductById(productId: $productId) {
      id
      title
      seller {
        id
        username
      }
      images
      price {
        initial
        current
      }
      bids {
        bidder {
          id
          username
        }
        bidPrice
      }
      category
      condition
      createdAt
      createdAt
      start
      end
      status
    }
  }
`;

function AdminProductDetail(props) {
  const { productId } = props;
  const [product, setProduct] = useState();
  const { loading, error, data } = useQuery(GET_PROD_BY_ID, {
    ssr: false,
    fetchPolicy: "network-only",
    variables: {
      productId: productId,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setProduct(data.getProductById);
    }
    if (error) {
      console.log("Error: ", error);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="adminContent">
        <div
          className="admin__content"
          style={{ alignItems: "center", fontSize: "1.6rem" }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="adminContent">
      <div className="admin__content">
        {product && <ProductDetail data={product} />}
      </div>
    </div>
  );
}

export default AdminProductDetail;
