import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-context";
import { useWatchlistStore } from "../../../store/watchlist-store";
import AuctionDropdownItem from "./auction-dropdown-item";

const GET_ACTIVED_PRODUCTS = gql`
  query {
    getActivedProducts {
      id
      title
      images
      bids {
        bidder {
          username
        }
      }
      price {
        initial
        current
      }
      start
      end
    }
  }
`;

function AuctionDropdown(props) {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const { watchlist } = useWatchlistStore();
  const { data, loading, error } = useQuery(GET_ACTIVED_PRODUCTS, {
    ssr: false,
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    if (data && !loading) {
      const { getActivedProducts } = data;
      setProductsList(
        getActivedProducts.filter(
          (product) =>
            watchlist.some((prod) => prod === product.id) &&
            new Date(product.end).toISOString() > new Date().toISOString()
        )
      );
    }
  }, [data, loading]);

  const toItemPage = () => {
    router.push("/items");
  };

  const compList = productsList.map((product) => {
    const haveBids = product.bids.length > 0;
    let lastBidder = "No Bid";

    if (haveBids) {
      lastBidder =
        product.bids[product.bids.length - 1].bidder.username.toString();
    }

    if (lastBidder.trim() === authCtx.user.username.trim()) {
      lastBidder = "You";
    }

    return (
      <AuctionDropdownItem
        image={product.images[0]}
        start={product.start}
        end={product.end}
        onClick={() => {
          console.log(product.title);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>{product.title}</p>
          <p>
            👑 {lastBidder}{" "}
            {`(${
              product.price.current?.toLocaleString("En-us") ||
              product.price.initial?.toLocaleString("En-us")
            }฿)`}
          </p>
        </div>
      </AuctionDropdownItem>
    );
  });

  return (
    <Fragment>
      <div className="user-dropdown user-dropdown--auction">{compList}</div>
    </Fragment>
  );
}

export default AuctionDropdown;
