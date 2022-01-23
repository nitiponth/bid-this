import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";

function Sidebar() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const path = router.pathname;
  const { cate } = router.query;

  const linkClass = "sidebar-nav__item";
  const linkActiveClass = "sidebar-nav__item sidebar-nav__item--active";

  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar-title">Explore</div>

        <nav className="sidebar-nav">
          <li className={!cate && path === "/" ? linkActiveClass : linkClass}>
            <Link href="/">
              <a className="sidebar-nav__link">
                <img
                  src="/images/ios-icon/high-voltage.png"
                  alt="in coming"
                  className="sidebar-nav__icon"
                />
                <span>In Coming</span>
              </a>
            </Link>
          </li>
          {/* <li className={cate === "clothing" ? linkActiveClass : linkClass}>
            <Link href="/?cate=clothing">
              <a className="sidebar-nav__link">
                <img
                  src="/images/ios-icon/t-shirt.png"
                  alt="Clothing"
                  className="sidebar-nav__icon"
                />
                <span>Clothing</span>
              </a>
            </Link>
          </li>
          <li className={cate === "electronics" ? linkActiveClass : linkClass}>
            <Link href="/?cate=electronics">
              <a href="#" className="sidebar-nav__link">
                <img
                  src="/images/ios-icon/video-game.png"
                  alt="electronics"
                  className="sidebar-nav__icon"
                />
                <span>Electronics</span>
              </a>
            </Link>
          </li>
          <li className={cate === "figures" ? linkActiveClass : linkClass}>
            <Link href="/?cate=figures">
              <a href="#" className="sidebar-nav__link">
                <img
                  src="/images/ios-icon/teddy-bear.png"
                  alt="Figures"
                  className="sidebar-nav__icon"
                />
                <span>Figures</span>
              </a>
            </Link>
          </li>
          <li className={cate === "others" ? linkActiveClass : linkClass}>
            <Link href="/?cate=others">
              <a href="#" className="sidebar-nav__link">
                <img
                  src="/images/ios-icon/magnifying-glass-tilted-left.png"
                  alt="Figures"
                  className="sidebar-nav__icon"
                />
                <span>Others</span>
              </a>
            </Link>
          </li> */}
          {/* <li className={cate === "watchlists" ? linkActiveClass : linkClass}>
            <Link href="/?cate=watchlists">
              <a href="#" className="sidebar-nav__link">
                <img
                  src="/images/ios-icon/bookmark.png"
                  alt="Watchlists"
                  className="sidebar-nav__icon"
                />
                <span>Watchlists</span>
              </a>
            </Link>
          </li> */}
          {authCtx.isLogin && (
            <li className={path === "/credits" ? linkActiveClass : linkClass}>
              <Link href="/credits">
                <a className="sidebar-nav__link">
                  <img
                    src="/images/ios-icon/gem-stone.png"
                    alt="Credits"
                    className="sidebar-nav__icon"
                  />
                  <span>Credits</span>
                </a>
              </Link>
            </li>
          )}
        </nav>
      </div>

      <div className="legal">
        &copy; 2021 by <a href="#">N. Do San.</a> <br></br>All rights reserved.
      </div>
    </Fragment>
  );
}

export default Sidebar;
