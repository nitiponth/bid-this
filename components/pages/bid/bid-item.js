import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../store/auth-context";
import LayoutContext from "../../../store/layout-context";
import BLoading from "../../molecules/BLoading/BLoading";

const PRODUCT_QUERY = gql`
  query ($getProductByIdProductId: ID!) {
    getProductById(productId: $getProductByIdProductId) {
      id
      title
      images
      seller {
        username
      }
      price {
        initial
        current
        bidOffer
      }
      start
      end
    }
  }
`;

const WALLET_QUERY = gql`
  query {
    me {
      wallet
    }
  }
`;

const PLACE_BID = gql`
  mutation ($placeBidProductId: ID!, $placeBidBidPrice: Int!) {
    placeBid(productId: $placeBidProductId, bidPrice: $placeBidBidPrice) {
      id
    }
  }
`;

function BidItem({ onClose }) {
  const authCtx = useContext(AuthContext);
  const layoutCtx = useContext(LayoutContext);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    ssr: false,
    variables: {
      getProductByIdProductId: layoutCtx.productId,
    },
    pollInterval: 500,
  });

  const { data: wallet } = useQuery(WALLET_QUERY, {
    ssr: false,
    pollInterval: 500,
  });

  const [placeBid] = useMutation(PLACE_BID);

  const [bidPrice, setBidPrice] = useState(0);

  useEffect(() => {
    if (data && !loading) {
      const current = new Date();
      if (
        new Date(data.getProductById.start).toISOString() >
          new Date(current).toISOString() ||
        new Date(data.getProductById.end).toISOString() <
          new Date(current).toISOString()
      ) {
        onClose();
        return;
      }
      if (data.getProductById.price.current) {
        setBidPrice(
          data.getProductById.price.current + data.getProductById.price.bidOffer
        );
      } else {
        setBidPrice(
          data.getProductById.price.initial + data.getProductById.price.bidOffer
        );
      }
      setIsLoading(false);
    }

    if (error && !loading) {
      console.log(error);
      onClose();
      return;
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (
      bidPrice < (item && item.price.current) ||
      bidPrice > (wallet && wallet.me.wallet)
    ) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [bidPrice, item]);

  const item = data?.getProductById;

  const onBidChangeHandler = (event) => {
    setBidPrice(+event.target.value);
  };

  const onPlus = () => {
    setBidPrice((prevBidPrice) =>
      +prevBidPrice + item.price.bidOffer <= wallet.me.wallet
        ? +prevBidPrice + item.price.bidOffer
        : +prevBidPrice
    );
  };
  const onMinus = () => {
    let lowestBid = item.price.initial;
    if (item.price.current) {
      lowestBid = item.price.current;
    }
    lowestBid += item.price.bidOffer;
    setBidPrice((prevBidPrice) =>
      +prevBidPrice - item.price.bidOffer >= lowestBid
        ? +prevBidPrice - item.price.bidOffer
        : +prevBidPrice
    );
  };

  const bidBtn = async () => {
    const { data } = await placeBid({
      variables: {
        placeBidProductId: item.id,
        placeBidBidPrice: bidPrice,
      },
    });
    if (data) {
      router.push(`/items/${item.id}`);
      layoutCtx.setModalType(null);
    } else console.log("bid placed!", error);
  };

  if (isLoading) {
    return <BLoading />;
  }

  return (
    <div className="bid-item">
      <div className="close-btn" onClick={onClose}>
        <img
          src="/images/SVG/cross.svg"
          alt="close button"
          className="btn__close-img"
        />
      </div>
      <div className="bid-item__title">Place a bid</div>
      <div className="section__head">
        <img
          src={item ? item.images[0] : ""}
          alt={item ? item.title : ""}
          className="section__head-img"
        />
      </div>
      <div className="section__auction">
        <div className="auction__title">{item && item.title}</div>
        <a href="#" className="auction__seller">
          @
          <span className="auction__seller--username">
            {item && item.seller.username}
          </span>
        </a>
        <label className="glabel glabel--medium">Current Bid</label>
        <div className="auction__at-least">
          {item &&
            (item.price.current ? item.price.current : item.price.initial)}
          ฿
        </div>
        <input
          value={bidPrice}
          type="number"
          id="bidPrice"
          placeholder="0"
          onChange={onBidChangeHandler}
          disabled={true}
          className="auction__bid-price"
        />
        <div className="auction__btn-group">
          <button className="auction__btn-minus" onClick={onMinus}>
            - {item && item.price.bidOffer}
          </button>
          <button className="auction__btn-plus" onClick={onPlus}>
            {item && item.price.bidOffer} +
          </button>
        </div>
        <div className="auction__user-credits">
          <span className="auction__user-credits--text">Your balance</span>
          <span className="auction__user-credits--value">
            {wallet?.me?.wallet.toLocaleString()} ฿
          </span>
        </div>
        <label className="glabel u-margin-bottom-extra-small">
          Once a bid is placed, it cannot be withdrawn
        </label>
        {!hasError && (
          <div role={"button"} onClick={bidBtn} className={"btn btn--w60"}>
            Place a bid
          </div>
        )}
        {hasError && (
          <a className={"btn btn--w60 btn--disabled"}>Place a bid</a>
        )}
      </div>
    </div>
  );
}

export default BidItem;
