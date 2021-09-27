import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import Layout from "../../components/layout/layout";
import SingleItem from "../../components/pages/single_item/single_item";

// const DUMMY_ITEMS = [
//   {
//     images: [
//       { uri: "/images/items/keyboard.jpg" },
//       { uri: "/images/items/keyboard2.jpg" },
//       { uri: "/images/items/keyboard3.jpg" },
//       { uri: "/images/items/keyboard4.jpg" },
//     ],
//     title: "Keychron",
//     seller: "piterpasma",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus purus, malesuada interdum orci molestie efficitur. Sed at dui elit. Suspendisse ultrices justo et ante varius pretium. Maecenas non.",
//     resPrice: 1900,
//     endTime: 1630060200000,
//     watched: true,
//   },
// ];

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

function SingleItemPage() {
  const { data, loading, error, subscribeToMore } = useQuery(PRODUCT_QUERY, {
    variables: {
      getProductByIdProductId: "614c0349fe56d1b17840b3d8",
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: BIDPLACED_SUB,
      variables: { bidPlacedProductId: "614c0349fe56d1b17840b3d8" },
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
  }, [subscribeToMore]);

  if (loading) return null;
  if (error) return `Error! ${error}`;

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

export default SingleItemPage;
