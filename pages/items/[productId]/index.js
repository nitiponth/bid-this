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
        bidOffer
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
      track
      sentAt
      status
      bids {
        id
        bidder {
          id
          username
          profile
        }
        bidPrice
        bidTime
      }
      buyer {
        id
        username
      }
      images
      condition
      shipping
      policy
      comment {
        id
        body
        score
        rImages
      }
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
          bidOffer
          initial
          current
        }
        end
        track
        buyer {
          id
          username
        }
        bids {
          id
          bidPrice
          bidder {
            id
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
            buyer: product.buyer,
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

  const itemData = {
    productId: productId,
    title: data.getProductById.title,
    images: data.getProductById.images,
    desc: data.getProductById.desc,
    sellerId: data.getProductById.seller.id,
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
    track: data.getProductById.track,
    sentAt: data.getProductById.sentAt,
    buyer: data.getProductById.buyer ? data.getProductById.buyer.id : null,
    buyerName: data.getProductById.buyer
      ? data.getProductById.buyer.username
      : null,
    status: data.getProductById.status,
    comment: data.getProductById.comment,
  };

  const bidders = data.getProductById.bids;

  return (
    <Layout>
      <SingleItem item={itemData} bidInfo={bidders} />
    </Layout>
  );
}

export default ProductPage;
