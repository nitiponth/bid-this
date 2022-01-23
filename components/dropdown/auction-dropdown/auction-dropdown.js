import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-context";
import { useWatchlistStore } from "../../../store/watchlist-store";
import BLoading from "../../molecules/BLoading/BLoading";
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
  const [productsList, setProductsList] = useState([]);

  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const { watchlist } = useWatchlistStore();
  const { data, loading, error } = useQuery(GET_ACTIVED_PRODUCTS, {
    ssr: false,
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

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
        key={product.id}
        image={product.images[0]}
        start={product.start}
        end={product.end}
        onClick={() => {
          router.push(`/items/${product.id}`);
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
      {loading && (
        <div className="user-dropdown user-dropdown--auction">
          <BLoading
            containerStyle={{ marginBottom: "2rem", marginTop: "2rem" }}
          />
        </div>
      )}

      {compList.length > 0 && (
        <div className="user-dropdown user-dropdown--auction">{compList}</div>
      )}
    </Fragment>
  );
}

export default AuctionDropdown;
