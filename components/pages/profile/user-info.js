import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../store/auth-context";
import { useFollowStore } from "../../../store/follow-store";
import PopupDropdown from "../../dropdown/profile-dropdown/profile-dropdown";
import PopupItem from "../../dropdown/profile-dropdown/profile-dropdown-item";
import BLoading from "../../molecules/BLoading/BLoading";
import BReportUser from "../../molecules/BReport/bReportUser";
import FollowModal from "../../organisms/FollowInfo/FollowModal";

import ItemCard from "../main-content/item_card";

const AUCTIONING_QUERY = gql`
  query ($getProductsByUserIdUserId: ID!, $getProductsByUserIdFilter: String) {
    getProductsByUserId(
      userId: $getProductsByUserIdUserId
      filter: $getProductsByUserIdFilter
    ) {
      id
      title
      desc
      images
      seller {
        id
        username
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

function UserInfo(props) {
  const router = useRouter();
  const {
    cover,
    desc,
    join,
    name,
    last,
    price,
    userId,
    username,
    followingCount,
    followersCount = 0,
  } = props.userData;

  const authCtx = useContext(AuthContext);
  const { following, toggleFollowing } = useFollowStore();
  const { lists } = router.query;
  const [userVerify, setUserVerify] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeFollowModal, setActiveFollowModal] = useState({
    active: false,
    topic: "Followers",
  });

  const [activeReportModal, setActiveReportModal] = useState(false);

  const [productsData, setProductsData] = useState();

  let variables;
  if (!lists || lists === "Auctioning") {
    variables = {
      getProductsByUserIdUserId: props.userData.userId,
      getProductsByUserIdFilter: null,
    };
  }
  if (lists === "Auctioned") {
    variables = {
      getProductsByUserIdUserId: props.userData.userId,
      getProductsByUserIdFilter: "AUCTIONED",
    };
  }
  if (lists === "Bidded") {
    variables = {
      getProductsByUserIdUserId: props.userData.userId,
      getProductsByUserIdFilter: "BIDDED",
    };
  }

  const { data, loading, error, refetch } = useQuery(AUCTIONING_QUERY, {
    ssr: false,
    variables,
  });

  useEffect(() => {
    if (loading === false && data) {
      if (data.getProductsByUserId !== null) {
        setProductsData(data.getProductsByUserId);
      }
      if (error) {
        console.log(error);
      }
    }
  });

  const checkFollowStatus = () => {
    if (!userId) {
      return;
    }
    const userIdx = following.indexOf(userId);

    if (userIdx === -1) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  };

  useEffect(() => {
    //initial following
    checkFollowStatus();
  }, [following, userId]);

  useEffect(() => {
    refetch();
  }, [lists]);

  if (!productsData && !error) {
    return <BLoading />;
  }

  const followingHandler = async () => {
    toggleFollowing(userId);
    props.refetch();
    checkFollowStatus();
  };

  const productsList = productsData.map((product) => {
    const productData = {
      productId: product.id,
      img: product.images[0],
      title: product.title,
      sellerId: product.seller.id,
      seller: product.seller.username,
      desc: product.desc,
      price: product.price.initial,
      lastPrice: product.price.current,
      start: product.start,
      endTime: product.end,
    };
    return <ItemCard item={productData} key={product.id} />;
  });

  const joinedMonth = new Date(props.userData.join);
  let isOwner = false;
  if (authCtx.user) {
    isOwner = authCtx.user.id === props.userData.userId;
  }
  return (
    <div className="user-info">
      <BReportUser
        active={activeReportModal}
        onClose={() => setActiveReportModal(false)}
        userId={userId}
        username={username}
      />
      <FollowModal
        active={activeFollowModal.active}
        initialTopic={activeFollowModal.topic}
        onClose={() => setActiveFollowModal({ active: false })}
        userId={userId}
      />

      <div
        className="banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(${props.userData.cover})`,
        }}
      >
        <div className="banner__profile">
          <img
            src={props.userData.profile}
            alt={props.userData.username}
            className="banner__profile-img"
          />
        </div>
        {isOwner ? (
          <Link href="/users/edit">
            <a className="banner__btn" style={{ backfaceVisibility: "hidden" }}>
              Edit
            </a>
          </Link>
        ) : authCtx.isLogin ? (
          <div onClick={followingHandler} className="banner__btn">
            {!isFollowing ? " Follow" : "Unfollow"}
          </div>
        ) : null}
      </div>
      <div className="info">
        <div className="info__name">
          <div className="info__name-display">
            {props.userData.name} {props.userData.last}{" "}
            {userVerify && (
              <span className="info__name-verify">
                <img
                  src="/images/ios-icon/check.png"
                  alt="verify"
                  className="info__name-verify-img"
                />
              </span>
            )}
          </div>
          <div className="info__name-username">
            @{" "}
            <span className="info__name-username--dec">
              {props.userData.username}
            </span>
          </div>
        </div>
        <div className="info__social">
          <div
            className="info__social-follow hover__pointer"
            onClick={() => {
              setActiveFollowModal({ active: true, topic: "Followers" });
            }}
          >
            {followersCount || 0}
            <label className="glabel">Followers</label>
          </div>
          <div
            className="info__social-follow hover__pointer"
            onClick={() => {
              setActiveFollowModal({ active: true, topic: "Following" });
            }}
          >
            {isOwner ? following.length || 0 : followingCount || 0}
            <label className="glabel">Following</label>
          </div>
        </div>
        <div className="info__desc">
          <div className="info__desc-header">Description</div>
          <p className="info__desc-text">{props.userData.desc}</p>
        </div>
        <div className="info__joined">
          <div className="info__joined-header">Joined</div>
          <div className="info__joined-date">
            {joinedMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
        {authCtx.isLogin && !isOwner && (
          <div className="info__popup">
            <PopupItem icon="/images/SVG/dots-three-horizontal.svg">
              <PopupDropdown setActiveReportModal={setActiveReportModal} />
            </PopupItem>
          </div>
        )}
        <div className="legal" style={{ marginTop: "auto" }}>
          &copy; 2022 by <a href="1">Nitiponth</a> <br></br>All rights reserved.
        </div>
      </div>
      <div className="auction-info">
        <nav className="auction-info__nav">
          {!lists || lists === "Auctioning" ? (
            <Link
              href={`/users/${props.userData.userId}?lists=Auctioning`}
              passHref
            >
              <li className="auction-info__nav-list auction-info__nav-list--actived">
                Auctioning <span className="reddot">{productsData.length}</span>
              </li>
            </Link>
          ) : (
            <Link
              href={`/users/${props.userData.userId}?lists=Auctioning`}
              passHref
            >
              <li className="auction-info__nav-list">
                Auctioning{" "}
                <span className="reddot reddot--dark">
                  {props.auctionData.auctioning}
                </span>
              </li>
            </Link>
          )}
          {lists === "Auctioned" ? (
            <Link
              href={`/users/${props.userData.userId}?lists=Auctioned`}
              passHref
            >
              <li className="auction-info__nav-list auction-info__nav-list--actived">
                Auctioned <span className="reddot">{productsData.length}</span>
              </li>
            </Link>
          ) : (
            <Link
              href={`/users/${props.userData.userId}?lists=Auctioned`}
              passHref
            >
              <li className="auction-info__nav-list ">
                Auctioned{" "}
                <span className="reddot reddot--dark">
                  {props.auctionData.auctioned}
                </span>
              </li>
            </Link>
          )}
          {lists === "Bidded" ? (
            <Link
              href={`/users/${props.userData.userId}?lists=Bidded`}
              passHref
            >
              <li className="auction-info__nav-list auction-info__nav-list--actived">
                Bidded <span className="reddot">{productsData.length}</span>
              </li>
            </Link>
          ) : (
            <Link
              href={`/users/${props.userData.userId}?lists=Bidded`}
              passHref
            >
              <li className="auction-info__nav-list ">
                Bidded
                <span className="reddot reddot--dark">
                  {props.auctionData.bidded}
                </span>
              </li>
            </Link>
          )}
        </nav>
        {isOwner &&
          authCtx.user.status === "FULLAUTHEN" &&
          (lists === "Auctioning" || !lists) && (
            <Link href="/users/add-item" passHref>
              <div className="auction-info__add-items">
                Click to add your items to the auction
              </div>
            </Link>
          )}
        <div className="auction-info__list-items">{productsList}</div>
      </div>
    </div>
  );
}

export default UserInfo;
