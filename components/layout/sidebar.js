import { Fragment } from "react";

function Sidebar() {
  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar__logo-box">
          <img
            src="/images/logo-land.png"
            alt="logo"
            className="sidebar__logo-img"
          />
        </div>

        <div className="sidebar-title">Explore</div>

        <nav className="sidebar-nav">
          <li className="sidebar-nav__item sidebar-nav__item--active">
            <a href="#" className="sidebar-nav__link">
              <img
                src="/images/ios-icon/high-voltage.png"
                alt="in coming"
                className="sidebar-nav__icon"
              />
              <span>In Coming</span>
            </a>
          </li>
          <li className="sidebar-nav__item">
            <a href="#" className="sidebar-nav__link">
              <img
                src="/images/ios-icon/t-shirt.png"
                alt="Clothing"
                className="sidebar-nav__icon"
              />
              <span>Clothing</span>
            </a>
          </li>
          <li className="sidebar-nav__item">
            <a href="#" className="sidebar-nav__link">
              <img
                src="/images/ios-icon/video-game.png"
                alt="Games"
                className="sidebar-nav__icon"
              />
              <span>Games</span>
            </a>
          </li>
          <li className="sidebar-nav__item">
            <a href="#" className="sidebar-nav__link">
              <img
                src="/images/ios-icon/teddy-bear.png"
                alt="Figures"
                className="sidebar-nav__icon"
              />
              <span>Figures</span>
            </a>
          </li>
          <li className="sidebar-nav__item">
            <a href="#" className="sidebar-nav__link">
              <img
                src="/images/ios-icon/bookmark.png"
                alt="Watchlists"
                className="sidebar-nav__icon"
              />
              <span>Watchlists</span>
            </a>
          </li>
          <li className="sidebar-nav__item">
            <a href="#" className="sidebar-nav__link">
              <img
                src="/images/ios-icon/gem-stone.png"
                alt="Credits"
                className="sidebar-nav__icon"
              />
              <span>Credits</span>
            </a>
          </li>
        </nav>
      </div>

      <div className="legal">
        &copy; 2021 by <a href="#">N. Do San.</a> <br></br>All rights reserved.
      </div>
    </Fragment>
  );
}

export default Sidebar;
