import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import Link from "next/link";

import UserDropdown from "../dropdown/user-dropdown/user-dropdown";
import UserLoginDropdown from "../dropdown/user-dropdown/user-login-dropdown";

import NavItem from "../navbar/nav-item";
import AuthContext from "../../store/auth-context";
import AuctionDropdown from "../dropdown/auction-dropdown/auction-dropdown";

const ME_QUERY = gql`
  query {
    me {
      id
      username
      wallet
      profile
    }
  }
`;

const WALLET_SUBSCRIPTION = gql`
  subscription ($walletChangedUserId: ID!) {
    walletChanged(userId: $walletChangedUserId)
  }
`;

function MainHeader() {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState(authCtx.user);
  const { data, loading, error, refetch, subscribeToMore } = useQuery(
    ME_QUERY,
    {
      fetchPolicy: "standby",
      ssr: false,
    }
  );

  useEffect(() => {
    if (loading === false && data) {
      if (data.me !== null) {
        setUserData(data.me);
      }
    }
    if (!authCtx.isLogin) {
      setUserData();
    }
  }, [loading, data, authCtx.isLogin]);

  useEffect(() => {
    refetch();
  }, [authCtx.isLogin]);

  useEffect(() => {
    if (authCtx.user && authCtx.user.id) {
      subscribeToMore({
        document: WALLET_SUBSCRIPTION,
        variables: { walletChangedUserId: authCtx.user.id },

        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          refetch();
        },
      });
    }
  });

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
        {userData ? (
          <div className="user-nav__user-box">
            <NavItem
              isLogin={true}
              user={userData.username}
              credits={userData.wallet}
              profile={
                userData.profile
                  ? userData.profile
                  : "/images/users/no-profile.jpg"
              }
            >
              <UserLoginDropdown user={userData} />
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
