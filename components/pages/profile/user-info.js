import Link from "next/link";
import { useContext, useState } from "react";
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

function UserInfo(props) {
  const [userVerify, setUserVerify] = useState(false);

  const authCtx = useContext(AuthContext);

  const productsList = props.productsData.map((product) => {
    const productData = {
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

  const isOwner = authCtx.userId === props.userData.userId;
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
          <div className="info__joined-date">April 2021</div>
        </div>
        <div className="info__popup">
          <PopupItem icon="/images/SVG/dots-three-horizontal.svg">
            <PopupDropdown />
          </PopupItem>
        </div>
        <div className="legal">
          &copy; 2021 by <a href="#">N. Do San.</a> <br></br>All rights
          reserved.
        </div>
      </div>
      <div className="auction-info">
        <nav className="auction-info__nav">
          <li className="auction-info__nav-list auction-info__nav-list--actived">
            Auctioning{" "}
            <span className="reddot">{props.productsData.length}</span>
          </li>
          <li className="auction-info__nav-list ">
            Auctioned <span className="reddot reddot--dark">{6}</span>
          </li>
          <li className="auction-info__nav-list ">
            Bidded <span className="reddot reddot--dark">{0}</span>
          </li>
        </nav>
        {isOwner && (
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
