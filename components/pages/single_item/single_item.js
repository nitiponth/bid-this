import Link from "next/link";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import useTimer from "../../../hooks/useTimer";
import ItemsDropdown from "../../dropdown/items-dropdown/items-dropdown";
import PopupItem from "../../dropdown/profile-dropdown/profile-dropdown-item";
import BCarousel from "../../molecules/bCarousel/bCarousel";
import { FiTruck } from "react-icons/fi";
import { BiPencil, BiSupport } from "react-icons/bi";
import Bidder from "./bidder";
import Lister from "./lister";
import AuthContext from "../../../store/auth-context";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import ReactStars from "react-rating-stars-component";

import Backdrop from "../../layout/backdrop";
import Dropzone from "react-dropzone";
import { useS3Upload } from "next-s3-upload";

import BWaiting from "../../atoms/BWaiting/BWaiting";
import BReportProduct from "../../molecules/BReport/bReportProduct";
import RefundModal from "../../organisms/RefundModal/RefundModal";
import LayoutContext from "../../../store/layout-context";
import BidderList from "../../organisms/BidderList/BidderList";

const UPDATE_TRACK = gql`
  mutation ($productId: ID!, $track: String!) {
    updateProductTrack(productId: $productId, track: $track) {
      id
      track
      sentAt
    }
  }
`;

const CONFIRM_PRODUCT = gql`
  mutation ($productId: ID!) {
    confirmProduct(productId: $productId) {
      id
      status
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation (
    $productId: ID!
    $body: String!
    $score: Float!
    $rImages: [String]
  ) {
    createComment(
      productId: $productId
      body: $body
      score: $score
      rImages: $rImages
    ) {
      id
    }
  }
`;

function SingleItem(props) {
  const { productId, title, seller } = props.item;
  const { status } = props.refund;
  const layoutCtx = useContext(LayoutContext);
  const router = useRouter();
  const { uploadToS3 } = useS3Upload();

  const [activeWaitingModal, setActiveWaitingModal] = useState(false);
  const [activeReportModal, setActiveReportModal] = useState(false);
  const [activeRefundModal, setActiveRefundModal] = useState(false);

  const [canBid, setCanBid] = useState(false);

  const authCtx = useContext(AuthContext);
  const countStart = useTimer(props.item.start);
  const countEnd = useTimer(props.item.endTime);
  const startTime = new Date(props.item.start);
  const endTime = new Date(props.item.endTime);
  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [moreThanTwoWeek, setMoreThanTwoWeek] = useState(false);
  const [reviewImagesArray, setReviewImagesArray] = useState([]);
  const [showReviewWindow, setShowReviewWindow] = useState(false);
  const [productScore, setProductScore] = useState(5);
  const textareContainer = useRef(null);
  const backdropRef = useRef();
  const [canRefund, setCanRefund] = useState(false);

  const trackNumber = useRef(props.item.track);

  const [updateProductTrack] = useMutation(UPDATE_TRACK);
  const [confirmProduct] = useMutation(CONFIRM_PRODUCT);
  const [createComment] = useMutation(CREATE_COMMENT);

  const { isLogin, user } = authCtx;

  useEffect(() => {
    const sevenDaysAfterEnd = new Date(endTime);
    sevenDaysAfterEnd.setDate(sevenDaysAfterEnd.getDate() + 7);

    const now = new Date();

    setCanRefund(now > sevenDaysAfterEnd);

    if (props.refund.status === "REFUNDED") {
      setCanRefund(false);
    }
  }, [status]);

  const current = new Date();
  // console.log(props.item.sentAt);
  let twoWeekOfSent = null;
  if (props.item.sentAt) {
    twoWeekOfSent = new Date(props.item.sentAt);
    // twoWeekOfSent.setMinutes(twoWeekOfSent.getMinutes() + 20);
    twoWeekOfSent.setDate(twoWeekOfSent.getDate() + 14);
    twoWeekOfSent.setHours(0, 0, 0, 0);
    // console.log(twoWeekOfSent);
  }

  useEffect(() => {
    if (twoWeekOfSent && current >= twoWeekOfSent) {
      setMoreThanTwoWeek(true);
    }
  });

  useEffect(() => {
    if (endTime < new Date()) {
      setIsEnd(true);
    }
    if (startTime <= new Date()) {
      setIsStart(true);
    }
  }, [endTime, startTime]);

  useEffect(() => {
    if (!authCtx.user) {
      setCanEdit(false);
      return;
    }
    if (props.item.sellerId !== authCtx.user.id) {
      setCanEdit(false);
      return;
    }

    if (countStart.timerDays > 0) {
      setCanEdit(true);
    } else if (countStart.timerHours > 0) {
      setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  }, [countStart]);

  useEffect(() => {
    if (!isLogin || !isStart) {
      return;
    }
    if (isEnd) {
      return;
    }
    if (user.status === "GUEST") {
      return;
    }
    setCanBid(true);
  }, [isEnd, isStart, isLogin, user]);

  const bidData = [...props.bidInfo].sort(
    (a, b) => new Date(b.bidTime) - new Date(a.bidTime)
  );

  const bidders = bidData.map((bidder) => {
    return <Bidder info={bidder} key={bidder.id || ""} />;
  });

  const policy = props.item.policy.map((item, index) => (
    <li className="item__desc-services--list" key={index}>
      {item}
    </li>
  ));

  const buyerId = props.item.buyer;

  const onUpdateTrack = async () => {
    const con = confirm(
      `Confirm track number — ${trackNumber.current.value} ?`
    );
    if (!con) {
      return;
    }
    const { data, error } = await updateProductTrack({
      variables: {
        productId: props.item.productId,
        track: trackNumber.current.value,
      },
    });

    if (data) {
      // console.log(data);
      router.reload();
    }
    if (error) console.log(error);
  };

  const onConfirm = async () => {
    const con = confirm(
      `Confirm that the product (${props.item.title}) has been received`
    );
    if (!con) {
      return;
    }
    const { data, error } = await confirmProduct({
      variables: {
        productId: props.item.productId,
      },
    });

    if (data) {
      // console.log(data);
      router.reload();
    }
    if (error) console.log(error);
  };

  const onScoreClick = async () => {
    setShowReviewWindow(true);
  };

  const ratingChanged = (newRating) => {
    setProductScore(newRating);
  };

  const onComment = async () => {
    // console.log("images: ", reviewImagesArray);
    // console.log("score: ", productScore);
    // console.log("review: ", textareContainer.current.value);
    const body = textareContainer.current.value;

    const { data, error } = await createComment({
      variables: {
        productId: props.item.productId,
        body: body,
        score: productScore,
        rImages: reviewImagesArray,
      },
    });

    if (data) {
      setShowReviewWindow(false);
      router.reload();
    }

    if (error) {
      console.log(error);
    }
  };

  let reviewSection = null;
  if (isEnd && props.item.comment) {
    reviewSection = (
      <Fragment>
        <label className="glabel">Product Review</label>
        <div className="product-review">
          <div className="image__section">
            <BCarousel items={props.item.comment.rImages} configSize="small" />
          </div>
          <div className="body">{props.item.comment.body}</div>
          <div className="rating">
            <div className="rating__star">
              <ReactStars
                size={30}
                value={props.item.comment.score}
                edit={false}
                color="#f8cb71"
              />
              <Link href={`/users/${props.item.buyer}`}>
                <a className="rating__username">{props.item.buyerName}</a>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  let trackSection = null;
  if (isEnd && authCtx.user && authCtx.user.id === props.item.sellerId) {
    //Seller
    if (props.item.buyer) {
      trackSection = (
        <Fragment>
          <label className="glabel">Tracking Number</label>
          <div className="item__desc-track">
            {props.item.status === "RECEIVED" && (
              <input
                disabled={true}
                className="item__desc-track-input"
                value={props.item.track}
              />
            )}
            {props.item.status !== "RECEIVED" && (
              <input
                className="item__desc-track-input"
                defaultValue={props.item.track ? props.item.track : ""}
                ref={trackNumber}
              />
            )}

            <div className="item__desc-btn-group">
              {moreThanTwoWeek && props.item.status !== "RECEIVED" && (
                <button type="button" className="item__desc-track-confirm">
                  Claim your Credits
                </button>
              )}
              {props.item.status !== "RECEIVED" && (
                <button
                  type="button"
                  onClick={onUpdateTrack}
                  className="item__desc-track-submit"
                >
                  {props.item.track ? <BiPencil /> : <FiTruck />}
                </button>
              )}
            </div>
          </div>
        </Fragment>
      );
    }
  } else if (isEnd && buyerId && authCtx.user && authCtx.user.id === buyerId) {
    //Buyer
    trackSection = (
      <Fragment>
        <label className="glabel">Tracking Number</label>
        <div className="item__desc-track">
          <input
            className="item__desc-track-input"
            style={{ fontSize: "1.5rem", width: "80%" }}
            disabled={true}
            value={
              props.item.track
                ? props.item.track
                : "The seller is preparing the parcel. "
            }
          />
          <div className="item__desc-btn-group" style={{ flexWrap: "wrap" }}>
            {props.item.track && props.item.status === "ACTIVED" && (
              <button
                type="button"
                onClick={onConfirm}
                className="item__desc-track-confirm"
              >
                Checked and Accepted
              </button>
            )}
            {props.item.track && props.item.status === "RECEIVED" && (
              <button
                type="button"
                onClick={onScoreClick}
                className="item__desc-track-confirm"
              >
                {props.item.comment ? "Edit Review" : "Score this product"}
              </button>
            )}
            <button
              type="button"
              className="item__desc-track-support"
              style={{ marginBottom: "10px" }}
              onClick={() => {
                if (process.env.DISCORD_INVITE) {
                  console.log("discord");
                  window.open(process.env.DISCORD_INVITE);
                }
              }}
            >
              <BiSupport />
            </button>
            {canRefund && (
              <button
                type="button"
                onClick={() => {
                  setActiveRefundModal(true);
                }}
                className="item__desc-track-support"
                style={{
                  width: "180px",
                  padding: "0 10px",
                  backgroundColor: "salmon",
                  color: "whitesmoke",
                }}
              >
                Refund this Auction
              </button>
            )}
          </div>
        </div>
      </Fragment>
    );
  }

  const productsThumbs = reviewImagesArray.map((url, index) => (
    <div
      className="floating__imagebox u-margin-bottom-extra-small"
      key={url.substring(64) || ""}
    >
      <div className="floating__imagebox-box">
        <img src={url} className="floating__imagebox-img" />
      </div>
      <aside className="floating__imagebox-aside">
        <div className="floating__imagebox-filename">
          {url.substring(64) || ""}
        </div>
        <button
          onClick={() => imageDeleteBtn(url)}
          className="floating__imagebox-delete"
        >
          Delete
        </button>
      </aside>
    </div>
  ));

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        showReviewWindow &&
        backdropRef.current &&
        !backdropRef.current.contains(e.target)
      ) {
        setShowReviewWindow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showReviewWindow]);

  const bidModalHandler = () => {
    layoutCtx.setProductId(productId);
    layoutCtx.setModalType("bid");
  };

  return (
    <Fragment>
      <BWaiting
        active={activeWaitingModal}
        canClose={false}
        onClose={() => {}}
      />
      <BReportProduct
        active={activeReportModal}
        onClose={() => setActiveReportModal(false)}
        productId={productId}
        productTitle={title}
        seller={seller}
      />
      <RefundModal
        active={activeRefundModal}
        onClose={() => setActiveRefundModal(false)}
        refund={props.refund}
      />
      <Backdrop show={showReviewWindow}>
        <div className="floating" ref={backdropRef}>
          <div className="floating__title">{props.item.title}</div>
          <div className="floating__sub">
            (Product ID: {props.item.productId})
          </div>
          {reviewImagesArray.length != 0 && (
            <div className="u-margin-bottom-extra-small">{productsThumbs}</div>
          )}
          <Dropzone
            multiple={true}
            onDrop={async (acceptedFiles) => {
              setActiveWaitingModal(true);
              const urls = [];

              let files = Array.from(acceptedFiles);

              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const { url } = await uploadToS3(file);
                urls.push(url);
              }
              setReviewImagesArray((prev) => [...prev, ...urls]);
              setActiveWaitingModal(false);
            }}
            accept={"./jpg, ./png"}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "floating__dropbox" })}>
                <input {...getInputProps()} />
                <p className="floating__dropbox-istext">
                  Drag and drop an image here, or click to browse.
                </p>
              </div>
            )}
          </Dropzone>

          <div className="floating__scoring">
            <div className="floating__scoring-star">
              <ReactStars
                count={5}
                size={50}
                onChange={ratingChanged}
                emptyIcon={<i className="far fa-star"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#f8cb71"
              />
            </div>
            <div className="floating__scoring-desc">
              Scoring your received product
            </div>

            <textarea
              id="productDetails"
              name="productDetails"
              rows="5"
              ref={textareContainer}
              className="floating__textarea"
              placeholder="Leave a comment on the product you received."
              spellCheck="false"
            />
          </div>
          <button type="button" onClick={onComment} className="floating__btn">
            Leave a comment
          </button>
        </div>
      </Backdrop>
      <div className="single-item">
        <div className="section__img">
          <BCarousel items={props.item.images} />
        </div>
        <div className="floatbox">
          <div className="floatbox--title">{props.item.title}</div>
          <div className="floatbox--seller">
            <Link href={`/users/${props.item.sellerId}`}>
              <a className="floatbox--seller--link">
                <span className="at-sign at-sign--md">@</span>
                {props.item.seller}
              </a>
            </Link>
          </div>
          {authCtx.isLogin && (
            <div className="floatbox--popup">
              <PopupItem
                icon="/images/SVG/dots-three-horizontal.svg"
                style="floatbox--popup-img"
              >
                <ItemsDropdown
                  productId={props.item.productId}
                  isEnd={isEnd}
                  canEdit={canEdit}
                  setActiveReportModal={setActiveReportModal}
                />
              </PopupItem>
            </div>
          )}
        </div>
        <div className="section__content">
          <div className="item__desc">
            <label className="glabel">Description</label>
            <div className="item__desc-text">{props.item.desc}</div>
            <label className="glabel">Condition</label>
            <div className="item__desc-delivery">
              <span className="item__desc-delivery--com">
                {props.item.condition}
              </span>
            </div>
            <label className="glabel">Delivery</label>
            <div className="item__desc-delivery">
              <span className="item__desc-delivery--com">
                {props.item.shipping}
              </span>
            </div>

            {policy.length > 0 && (
              <Fragment>
                <label className="glabel">Warranty Policy</label>
                <ul className="item__desc-services">{policy}</ul>
              </Fragment>
            )}
            {reviewSection}
            {trackSection}
          </div>
          <div className="item__auction">
            <div className="item__bidding">
              <div className="item__bidding-bid">
                {props.item.current ? (
                  <label className="glabel">
                    {isEnd ? "Ended bid" : "Current bid"}
                  </label>
                ) : (
                  <label className="glabel">Reserve Price</label>
                )}
                <div className="item__bidding-bid--price">
                  {props.item.current
                    ? props.item.current.toLocaleString()
                    : props.item.resPrice.toLocaleString()}{" "}
                  ฿
                </div>
              </div>
              <div className="item__bidding-time">
                {isStart ? (
                  <Fragment>
                    {isEnd && (
                      <label className="glabel">The auction has ended</label>
                    )}
                    {!isEnd && (
                      <label className="glabel">Auction ending in</label>
                    )}
                    <div className="item__bidding-time-box">
                      <div className="item__bidding-time--text">
                        {!isEnd ? `${countEnd.timerHours}` : `-- `}h
                      </div>
                      <div className="item__bidding-time--text">
                        {!isEnd ? `${countEnd.timerMinutes}` : `-- `}m
                      </div>
                      <div className="item__bidding-time--text">
                        {!isEnd ? `${countEnd.timerSeconds}` : `-- `}s
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <label className="glabel">Auction will start in</label>
                    <div className="item__bidding-time-box">
                      {countStart.timerDays > 0 && (
                        <div className="item__bidding-time--text">
                          {countStart.timerDays}d
                        </div>
                      )}

                      <div className="item__bidding-time--text">
                        {countStart.timerHours}h
                      </div>
                      <div className="item__bidding-time--text">
                        {countStart.timerMinutes}m
                      </div>
                      {countStart.timerDays <= 0 && (
                        <div className="item__bidding-time--text">
                          {countStart.timerSeconds}s
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="item__bidding-btn">
                <button
                  role={"button"}
                  onClick={bidModalHandler}
                  disabled={!canBid}
                  className={`btn btn--single-item ${
                    !canBid && "btn--disabled"
                  }`}
                >
                  Place a bid
                </button>
              </div>
            </div>

            <BidderList>
              {bidders}
              <Lister
                username={props.item.seller}
                userId={props.item.sellerId}
                resPrice={props.item.resPrice}
                listTime={props.item.createdAt}
                avatar={props.item.avatar}
              />
            </BidderList>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SingleItem;
