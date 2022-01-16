import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import Layout from "../../../components/layout/layout";
import SingleItem from "../../../components/pages/single_item/single_item";
import BLoading from "../../../components/atoms/BLoading/BLoading";

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
      extendTime
      createdAt
    }
  }
`;

const BIDPLACED_SUB = gql`
  subscription ($bidPlacedProductId: ID!) {
    bidPlaced(productId: $bidPlacedProductId) {
      product {
        price {
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
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { productId } = router.query;

  const { data, loading, error, subscribeToMore, refetch } = useQuery(
    PRODUCT_QUERY,
    {
      ssr: false,
      variables: {
        getProductByIdProductId: productId,
      },
    }
  );

  useEffect(() => {
    if (!loading && data) {
      setIsLoading(false);

      const now = new Date();
      if (new Date(data.getProductById.end) < now) {
        setIsEnd(true);
      }
    }
  }, [data, loading, error]);

  useEffect(() => {
    let unsubscribe;

    if (!productId && isEnd) {
      return null;
    }
    if (!isEnd) {
      return;
    }
    unsubscribe = subscribeToMore({
      document: BIDPLACED_SUB,
      variables: { bidPlacedProductId: productId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData?.data) return prev;
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

    if (unsubscribe) return () => unsubscribe();
  }, [subscribeToMore, productId, isEnd]);

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
    buyer: data.getProductById?.buyer?.id,
    buyerName: data.getProductById?.buyer?.username,
    status: data.getProductById.status,
    comment: data.getProductById.comment,
  };

  const bidders = data.getProductById.bids;

  const refundData = {
    id: data.getProductById.id,
    title: data.getProductById.title,
    sellerId: data.getProductById.seller.id,
    seller: data.getProductById.seller.username,
    winnerId: data.getProductById.buyer?.id,
    winner: data.getProductById.buyer?.username,
    end: data.getProductById.end,
    finalPrice: data.getProductById.price.current,
    extendTime: !!data.getProductById?.extendTime,
    status: data.getProductById?.status,
    refetch,
  };

  return (
    <Layout>
      {isLoading ? (
        <BLoading />
      ) : (
        <SingleItem item={itemData} bidInfo={bidders} refund={refundData} />
      )}
    </Layout>
  );
}

export default ProductPage;
