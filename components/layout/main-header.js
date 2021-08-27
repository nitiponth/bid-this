import { Fragment, useContext } from "react";
import Link from "next/link";

import UserDropdown from "../dropdown/user-dropdown/user-dropdown";
import UserLoginDropdown from "../dropdown/user-dropdown/user-login-dropdown";

import NavItem from "../navbar/nav-item";
import AuthContext from "../../store/auth-context";
import AuctionDropdown from "../dropdown/auction-dropdown/auction-dropdown";

function MainHeader() {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <Link href="/">
        <div className="header__logo-box">
          <img
            src="/images/logo-land.png"
            alt="logo"
            className="header__logo-img"
          />
        </div>
      </Link>
      <form className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Search items"
        />
        <button className="search__button">
          <img
            src="/images/SVG/magnifying-glass.svg"
            alt="magnifying icon"
            className="search__icon"
          />
        </button>
      </form>
      <nav className="user-nav">
        <a href="#" className="user-nav__link">
          Product
        </a>
        <a href="#" className="user-nav__link">
          Shipping
        </a>
        <div className="user-nav__icon-box">
          <NavItem icon="/images/SVG/auction.svg" notification={2}>
            <AuctionDropdown />
          </NavItem>
        </div>
        {authCtx.isLogin ? (
          <div className="user-nav__user-box">
            <NavItem
              isLogin={authCtx.isLogin}
              user={"gorgias"}
              credits={5000}
              profile="/images/users/user2.jpg"
            >
              <UserLoginDropdown />
            </NavItem>
          </div>
        ) : (
          <div className="user-nav__icon-box">
            <NavItem icon="/images/SVG/user.svg">
              <UserDropdown />
            </NavItem>
          </div>
        )}
      </nav>
    </Fragment>
  );
}

export default MainHeader;
