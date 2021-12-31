import { useRouter } from "next/router";
import { useQuery, gql, useSubscription } from "@apollo/client";
import ItemCard from "./item_card";
import ItemHero from "./item_hero";
import { useEffect, useState } from "react";

const PRODUCTS_QUERY = gql`
  query {
    getActivedProducts {
      id
      title
      images
      desc
      start
      end
      price {
        initial
        current
      }
      seller {
        id
        username
      }
    }
  }
`;

const PRODUCTS_CHANGED_SUB = gql`
  subscription {
    productsChanged
  }
`;

function MainContent() {
  const router = useRouter();
  const { cate } = router.query;
  const [productsData, setProductData] = useState();

  const { data, loading, error, refetch, subscribeToMore } = useQuery(
    PRODUCTS_QUERY,
    {
      ssr: false,
      pollInterval: 10000,
    }
  );

  useEffect(() => {
    if (loading === false && data) {
      if (data.getActivedProducts !== null) {
        setProductData(data.getActivedProducts);
      }
      if (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    subscribeToMore({
      document: PRODUCTS_CHANGED_SUB,

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        refetch();
        return prev;
      },
    });
  });

  if (!productsData && !error) {
    return <p>Loading....</p>;
  }

  const products = productsData
    .map((product) => {
      return {
        key: product.id,
        productId: product.id,
        title: product.title,
        img: product.images[0],
        desc: product.desc,
        price: product.price.initial,
        lastPrice: product.price.current,
        start: product.start,
        endTime: product.end,
        seller: product.seller.username,
        sellerId: product.seller.id,
      };
    })
    .sort((a, b) => {
      //End first come first
      let fa = new Date(a.endTime);
      let fb = new Date(b.endTime);

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    });

  let filteredItems = products.reverse();

  if (filteredItems.length === 0) {
    return (
      <div className="main-content">
        {!cate && (
          <div className="main-content__hero">
            <p
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.4rem",
              }}
            >
              No product for auction
            </p>
          </div>
        )}
      </div>
    );
  }

  if (cate) {
    filteredItems = DUMMY_ITEMS.filter((item) => item.category === cate);
  }
  // if (cate === "watchlists") {
  //   filteredItems = DUMMY_ITEMS.filter((item) => item.watched);
  //   console.log(filteredItems);
  // }
  // const itemLists = filteredItems
  //   .slice(1, filteredItems.length - 1)
  //   .map((product) => <ItemCard item={product} />);

  let itemLists = filteredItems
    .slice(1, filteredItems.length)
    .map((product) => <ItemCard item={product} key={product.productId} />);
  if (cate) {
    itemLists = filteredItems.map((product) => (
      <ItemCard item={product} key={product.productId} />
    ));
  }

  return (
    <div className="main-content">
      {!cate && (
        <div className="main-content__hero">
          <ItemHero item={filteredItems[0]} key={filteredItems[0].key} />
        </div>
      )}

      {itemLists}
    </div>
  );
}

export default MainContent;
