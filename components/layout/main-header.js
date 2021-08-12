import { Fragment } from "react";

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
          <img
            src="/images/SVG/auction.svg"
            alt="auction icon"
            className="user-nav__icon"
          />
          <span className="user-nav__notification">2</span>
        </div>
        <div className="user-nav__icon-box">
          <img
            src="/images/SVG/user.svg"
            alt="user icon"
            className="user-nav__icon"
          />
        </div>
      </nav>
    </Fragment>
  );
}

export default MainHeader;
