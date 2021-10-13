import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../store/auth-context";

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

function BidItem() {
  const authCtx = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const productId = router.asPath.split("/")[2];

  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    ssr: false,
    variables: {
      getProductByIdProductId: productId,
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
        data.getProductById.start > current.toLocaleString("en-US") ||
        data.getProductById.end < current.toLocaleString("en-US")
      ) {
        router.push(`/items/${data.getProductById.id}`);
      }
      if (data.getProductById.price.current) {
        setBidPrice(data.getProductById.price.current + 1000);
      } else {
        setBidPrice(data.getProductById.price.initial + 1000);
      }
    }

    if (error && !loading) {
      router.push("/");
    }
  }, [data, loading, error]);

  const item = data && data.getProductById;

  const onClose = () => {
    router.back();
  };

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

  const bidBtn = async () => {
    const { data, errors } = await placeBid({
      variables: {
        placeBidProductId: item.id,
        placeBidBidPrice: bidPrice,
      },
    });
    if (data) {
      // console.log("bid placed!", data);
      router.push(`/items/${productId}`);
    } else console.log("bid placed!", error);
  };

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
            {wallet && wallet.me.wallet} ฿
          </span>
        </div>
        <label className="glabel u-margin-bottom-extra-small">
          Once a bid is placed, it cannot be withdrawn
        </label>
        {!hasError && (
          <a onClick={bidBtn} className={"btn btn--w60"}>
            Place a bid
          </a>
        )}
        {hasError && (
          <a className={"btn btn--w60 btn--disabled"}>Place a bid</a>
        )}
      </div>
    </div>
  );
}

export default BidItem;
