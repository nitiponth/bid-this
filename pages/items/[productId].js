import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import Layout from "../../components/layout/layout";
import SingleItem from "../../components/pages/single_item/single_item";

const PRODUCT_QUERY = gql`
  query ($getProductByIdProductId: ID!) {
    getProductById(productId: $getProductByIdProductId) {
      id
      title
      desc
      price {
        initial
        current
      }
      seller {
        id
        username
      }
      end
      bids {
        bidder {
          username
        }
        bidPrice
        bidTime
      }
    }
  }
`;

const BIDPLACED_SUB = gql`
  subscription ($bidPlacedProductId: ID!) {
    bidPlaced(productId: $bidPlacedProductId) {
      product {
        id
        title
        price {
          initial
          current
        }
        end
        bids {
          bidPrice
          bidder {
            username
          }
          bidTime
        }
      }
    }
  }
`;

function ProductPage() {
  const router = useRouter();
  const { productId } = router.query;

  const { data, loading, error, subscribeToMore } = useQuery(PRODUCT_QUERY, {
    variables: {
      getProductByIdProductId: productId,
    },
  });

  useEffect(() => {
    if (!productId) {
      return null;
    }
    subscribeToMore({
      document: BIDPLACED_SUB,
      variables: { bidPlacedProductId: productId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const product = subscriptionData.data.bidPlaced.product;

        return {
          getProductById: {
            ...prev.getProductById,
            price: {
              ...product.price,
            },
            end: product.end,
            bids: product.bids,
          },
        };
      },
    });
  }, [subscribeToMore, productId]);

  if (loading) return null;
  if (error) return router.push("/404");
  //   if (error) return `Error! ${error}`;

  const itemData = {
    title: data.getProductById.title,
    images: [
      { uri: "/images/items/keyboard.jpg" },
      { uri: "/images/items/keyboard2.jpg" },
      { uri: "/images/items/keyboard3.jpg" },
      { uri: "/images/items/keyboard4.jpg" },
    ],
    desc: data.getProductById.desc,
    seller: data.getProductById.seller.username,
    resPrice: data.getProductById.price.current
      ? data.getProductById.price.current
      : data.getProductById.price.initial,
    endTime: data.getProductById.end,
  };

  const bidders = data.getProductById.bids;

  return (
    <Layout>
      <SingleItem item={itemData} bidInfo={bidders} />
    </Layout>
  );
}

export default ProductPage;
