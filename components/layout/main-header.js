import { Fragment } from "react";

import UserDropdown from "../dropdown/user-dropdown/user-dropdown";

import NavItem from "../navbar/nav-item";

function MainHeader() {
  return (
    <Fragment>
      <div className="header__logo-box">
        <img
          src="/images/logo-land.png"
          alt="logo"
          className="header__logo-img"
        />
      </div>
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
          <NavItem icon="/images/SVG/auction.svg" notification={2} />
        </div>
        <div className="user-nav__icon-box">
          <NavItem icon="/images/SVG/user.svg">
            <UserDropdown />
          </NavItem>
        </div>
      </nav>
    </Fragment>
  );
}

export default MainHeader;
