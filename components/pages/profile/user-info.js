import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../store/auth-context";
import PopupDropdown from "../../dropdown/profile-dropdown/profile-dropdown";
import PopupItem from "../../dropdown/profile-dropdown/profile-dropdown-item";

import ItemCard from "../main-content/item_card";

// const DUMMY_ITEMS = [
//   {
//     img: "/images/items/keyboard.jpg",
//     title: "Keychron",
//     seller: "piterpasma",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus purus, malesuada interdum orci molestie efficitur. Sed at dui elit. Suspendisse ultrices justo et ante varius pretium. Maecenas non.",
//     resPrice: 1990,
//     endTime: 1630060200000,
//     category: "electronics",

//     watched: true,
//   },
// ];

const AUCTIONING_QUERY = gql`
  query ($getProductsByUserIdUserId: ID!, $getProductsByUserIdFilter: String) {
    getProductsByUserId(
      userId: $getProductsByUserIdUserId
      filter: $getProductsByUserIdFilter
    ) {
      id
      title
      desc
      seller {
        username
      }
      price {
        initial
        current
      }
      end
    }
  }
`;

function UserInfo(props) {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const { lists } = router.query;
  const [userVerify, setUserVerify] = useState(false);

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
        // console.log(data);
        setProductsData(data.getProductsByUserId);
      }
      if (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    refetch();
  }, [lists]);

  if (!productsData && !error) {
    return <p>Loading....</p>;
  }

  const productsList = productsData.map((product) => {
    const productData = {
      productId: product.id,
      img: "/images/items/keyboard.jpg",
      title: product.title,
      seller: product.seller.username,
      desc: product.desc,
      price: product.price.initial,
      lastPrice: product.price.current,
      endTime: product.end,
    };
    return <ItemCard item={productData} key={product.id} />;
  });

  const joinedMonth = new Date(props.userData.join);

  const isOwner = authCtx.user.id === props.userData.userId;
  return (
    <div className="user-info">
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
            <a className="banner__btn">Edit</a>
          </Link>
        ) : (
          <a className="banner__btn">Follow</a>
        )}
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
          <div className="info__social-follow">
            10
            <label className="glabel">Following</label>
          </div>
          <div className="info__social-follow">
            15
            <label className="glabel">Followers</label>
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
        <div className="info__popup">
          <PopupItem icon="/images/SVG/dots-three-horizontal.svg">
            <PopupDropdown />
          </PopupItem>
        </div>
        <div className="legal">
          &copy; 2021 by <a href="1">N. Do San.</a> <br></br>All rights
          reserved.
        </div>
      </div>
      <div className="auction-info">
        <nav className="auction-info__nav">
          {!lists || lists === "Auctioning" ? (
            <Link href={`/users/${props.userData.userId}?lists=Auctioning`}>
              <li className="auction-info__nav-list auction-info__nav-list--actived">
                Auctioning <span className="reddot">{productsData.length}</span>
              </li>
            </Link>
          ) : (
            <Link href={`/users/${props.userData.userId}?lists=Auctioning`}>
              <li className="auction-info__nav-list">
                Auctioning{" "}
                <span className="reddot reddot--dark">
                  {props.auctionData.auctioning}
                </span>
              </li>
            </Link>
          )}
          {lists === "Auctioned" ? (
            <Link href={`/users/${props.userData.userId}?lists=Auctioned`}>
              <li className="auction-info__nav-list auction-info__nav-list--actived">
                Auctioned <span className="reddot">{productsData.length}</span>
              </li>
            </Link>
          ) : (
            <Link href={`/users/${props.userData.userId}?lists=Auctioned`}>
              <li className="auction-info__nav-list ">
                Auctioned{" "}
                <span className="reddot reddot--dark">
                  {props.auctionData.auctioned}
                </span>
              </li>
            </Link>
          )}
          {lists === "Bidded" ? (
            <Link href={`/users/${props.userData.userId}?lists=Bidded`}>
              <li className="auction-info__nav-list auction-info__nav-list--actived">
                Bidded <span className="reddot">{productsData.length}</span>
              </li>
            </Link>
          ) : (
            <Link href={`/users/${props.userData.userId}?lists=Bidded`}>
              <li className="auction-info__nav-list ">
                Bidded
                <span className="reddot reddot--dark">
                  {props.auctionData.bidded}
                </span>
              </li>
            </Link>
          )}
        </nav>
        {isOwner && (lists === "Auctioning" || !lists) && (
          <Link href="/users/add-item">
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
