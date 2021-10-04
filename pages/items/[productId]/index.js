import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import Layout from "../../../components/layout/layout";
import SingleItem from "../../../components/pages/single_item/single_item";

const PRODUCT_QUERY = gql`
  query ($getProductByIdProductId: ID!) {
    getProductById(productId: $getProductByIdProductId) {
      id
      title
      desc
      category
      price {
        initial
        current
      }
      seller {
        id
        username
        profile
      }
      start
      end
      bids {
        bidder {
          username
          profile
        }
        bidPrice
        bidTime
      }
      images
      condition
      shipping
      policy
      createdAt
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
            profile
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
  // if (error) return router.push("/404");
  if (error) return `Error! ${error}`;

  console.log(data);
  const itemData = {
    title: data.getProductById.title,
    images: data.getProductById.images,
    desc: data.getProductById.desc,
    seller: data.getProductById.seller.username,
    avatar: data.getProductById.seller.profile,
    resPrice: data.getProductById.price.initial,
    current: data.getProductById.price.current,
    start: data.getProductById.start,
    endTime: data.getProductById.end,
    shipping: data.getProductById.shipping,
    condition: data.getProductById.condition,
    policy: data.getProductById.policy,
    createdAt: data.getProductById.createdAt,
  };

  const bidders = data.getProductById.bids;

  return (
    <Layout>
      <SingleItem item={itemData} bidInfo={bidders} />
    </Layout>
  );
}

export default ProductPage;
