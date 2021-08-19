import { useState } from "react";
import PopupDropdown from "../../dropdown/profile-dropdown/profile-dropdown";
import PopupItem from "../../dropdown/profile-dropdown/profile-dropdown-item";

import ItemCard from "../main-content/item_card";

const DUMMY_ITEMS = [
  {
    img: "/images/items/model1.jpg",
    title: "Luffy Samurai",
    seller: "johndoe",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis metus quis nibh sodales consectetur ac id turpis. Nulla nec facilisis libero, a fermentum arcu. Nullam mollis lacus varius erat pulvinar mattis. Vestibulum congue hendrerit nunc id suscipit. Nullam fermentum.",
    resPrice: 500,
    endTime: 1629379800000,
    watched: true,
  },
  {
    img: "/images/items/item2.jpg",
    title: "Skateboard",
    seller: "oliver",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a consectetur ligula. In varius magna ac sapien dapibus, vehicula finibus felis mollis. Morbi ac enim dignissim, semper risus ut, dictum ligula. Proin nisl elit, laoreet non fermentum ac, posuere sed leo. Praesent maximus ac est mattis convallis. Aliquam erat volutpat.",
    resPrice: 1000,
    endTime: 1629385200000,
    watched: false,
  },
  {
    img: "/images/items/item3.jpg",
    title: "Macintosh ED",
    seller: "PabloMartinez",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur sed justo non aliquam. Phasellus quam felis, fermentum condimentum lectus sed, iaculis tempus risus. Sed id pellentesque metus. Nullam sagittis",
    resPrice: 3000,
    endTime: 1629111600000,
    watched: false,
  },
  {
    img: "/images/items/model4.jpg",
    title: "Gibson Les Paul",
    seller: "NeonBRAND",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia nisl a commodo pulvinar. Integer dapibus vestibulum egestas. Mauris sed faucibus quam. Donec congue urna eu iaculis pharetra. Maecenas dui.",
    resPrice: 10000,
    endTime: 1629109800000,
    watched: false,
  },
  {
    img: "/images/items/model5.jpg",
    title: "NIKE Off-Whie",
    seller: "ChrisHenry",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non nisl dapibus, volutpat est non, vestibulum augue. Pellentesque sed ante vestibulum leo convallis mattis sit amet facilisis mi. Duis non ipsum vitae nisi volutpat dictum.",
    resPrice: 4888,
    endTime: 1629115200000,
    watched: true,
  },
  {
    img: "/images/items/keyboard.jpg",
    title: "Keychron",
    seller: "gorgias",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis lorem neque, et rhoncus ex ornare sit amet. Nam posuere rhoncus purus, malesuada interdum orci molestie efficitur. Sed at dui elit. Suspendisse ultrices justo et ante varius pretium. Maecenas non.",
    resPrice: 1990,
    endTime: 1629115200000,
    watched: true,
  },
];

function UserInfo(props) {
  const [userVerify, setUserVerify] = useState(true);
  return (
    <div className="user-info">
      <div
        className="banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url("/images/users/bg-cover1.jpg")`,
        }}
      >
        <div className="banner__profile">
          <img
            src="images/users/user2.jpg"
            alt="user profile"
            className="banner__profile-img"
          />
        </div>
        <a className="banner__btn">Follow</a>
      </div>
      <div className="info">
        <div className="info__name">
          <div className="info__name-display">
            {"Piter"} {"Pasma"}{" "}
            {userVerify && (
              <span className="info__name-verify">
                <img
                  src="images/ios-icon/check.png"
                  alt="verify"
                  className="info__name-verify-img"
                />
              </span>
            )}
          </div>
          <div className="info__name-username">
            @ <span className="info__name-username--dec">{"piterpasma"}</span>
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
          <p className="info__desc-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            magna odio, euismod eget lacinia a, dapibus vitae nunc. Cras
            lobortis sagittis lectus quis dictum. Nam scelerisque ullamcorper
            mi, ut volutpat orci. Sed malesuada imperdiet ante. Suspendisse non
            pharetra ipsum. Integer consectetur enim tortor, eget convallis ex
            tincidunt ac. Mauris vitae urna lorem. Sed in neque et felis euismod
            semper. Nulla ac nunc vitae dui blandit gravida in sed erat. Etiam
            ut arcu velit.
          </p>
        </div>
        <div className="info__joined">
          <div className="info__joined-header">Joined</div>
          <div className="info__joined-date">April 2021</div>
        </div>
        <div className="info__popup">
          <PopupItem icon="images/SVG/dots-three-horizontal.svg">
            <PopupDropdown />
          </PopupItem>
          {/* <img
            src="images/SVG/dots-three-horizontal.svg"
            alt="three dot"
            className="floatbox--popup-img"
          /> */}
        </div>
        <div className="legal">
          &copy; 2021 by <a href="#">N. Do San.</a> <br></br>All rights
          reserved.
        </div>
      </div>
      <div className="auction-info">
        <nav className="auction-info__nav">
          <li className="auction-info__nav-list auction-info__nav-list--actived">
            Auctioning <span className="reddot">{2}</span>
          </li>
          <li className="auction-info__nav-list ">
            Auctioned <span className="reddot reddot--dark">{6}</span>
          </li>
          <li className="auction-info__nav-list ">
            Bidded <span className="reddot reddot--dark">{0}</span>
          </li>
        </nav>
        <div className="auction-info__list-items">
          <ItemCard item={DUMMY_ITEMS[0]} />
          <ItemCard item={DUMMY_ITEMS[1]} />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
