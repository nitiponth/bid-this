import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

import Link from "next/link";

import UserDropdown from "../dropdown/user-dropdown/user-dropdown";
import UserLoginDropdown from "../dropdown/user-dropdown/user-login-dropdown";

import NavItem from "../navbar/nav-item";
import AuthContext from "../../store/auth-context";
import AuctionDropdown from "../dropdown/auction-dropdown/auction-dropdown";
import Image from "next/image";

import logo from "../../public/images/logo-land.png";
import { observer } from "mobx-react-lite";
import { useAccountStore } from "../../store/accountStore";
import { useNotificationStore } from "../../store/notificationStore";
import NotificationDropdown from "../dropdown/notificationDropdown/NotificationDropdown";

const ME_QUERY = gql`
  query {
    me {
      id
      username
      wallet
      profile
      role
    }
  }
`;

const WALLET_SUBSCRIPTION = gql`
  subscription ($walletChangedUserId: ID!) {
    walletChanged(userId: $walletChangedUserId)
  }
`;

const NOTIFLY_SUB = gql`
  subscription Subscription($userId: ID!) {
    userNotification(userId: $userId) {
      _id
    }
  }
`;

const NOTIFITION_QUERY = gql`
  query Query($offset: Int) {
    getNotifications(offset: $offset) {
      metadata {
        count
        current
        limit
        offset
      }
      data {
        _id
        message
        product {
          id
          images
        }
        createdAt
        seen
      }
      unseen
    }
  }
`;

function MainHeader() {
  const authCtx = useContext(AuthContext);
  const { wallet, initializeWallet } = useAccountStore();
  const { initializeNotifications, setRefetchNotifications, setFetchMore } =
    useNotificationStore();

  const [userData, setUserData] = useState(authCtx.user);
  const { data, loading, error, refetch, subscribeToMore } = useQuery(
    ME_QUERY,
    {
      fetchPolicy: "network-only",
      ssr: false,
    }
  );

  const {
    data: notiData,
    subscribeToMore: subToMore,
    refetch: notiRefetch,
  } = useQuery(NOTIFITION_QUERY, {
    variables: {
      offset: 0,
    },
  });

  useEffect(() => {
    if (loading === false && data) {
      if (data.me !== null) {
        initializeWallet(data.me.wallet);
        setUserData(data.me);
      }
    }
    if (!authCtx.isLogin) {
      setUserData();
    }
  }, [loading, data, authCtx.isLogin]);

  useEffect(() => {
    if (!authCtx.isLogin) {
      return;
    }

    if (notiData) {
      initializeNotifications(
        notiData.getNotifications.data,
        notiData.getNotifications.metadata,
        notiData.getNotifications.unseen
      );
      setRefetchNotifications(notiRefetch);
    }
  }, [notiData]);

  useEffect(() => {
    let unsubscribeNoti;
    if (authCtx?.user?.id) {
      const userId = authCtx.user.id;
      unsubscribeNoti = subToMore({
        document: NOTIFLY_SUB,
        variables: {
          userId,
        },

        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          notiRefetch();
        },
      });
    }
  }, [authCtx, subToMore]);

  useEffect(() => {
    refetch();
    notiRefetch();
  }, [authCtx.isLogin]);

  useEffect(() => {
    let unsubscribe;
    if (authCtx?.user?.id) {
      unsubscribe = subscribeToMore({
        document: WALLET_SUBSCRIPTION,
        variables: { walletChangedUserId: authCtx.user.id },

        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          initializeWallet(subscriptionData.data.walletChanged);
        },
      });
    }

    if (unsubscribe) return () => unsubscribe();
  }, [authCtx, subscribeToMore]);

  return (
    <Fragment>
      <Link href="/" passHref>
        <div className="header__logo-box">
          <div className="header__logo-img">
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={70}
              objectFit="cover"
            />
          </div>
        </div>
      </Link>
      <form className="search">
        {/* <input
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
        </button> */}
      </form>
      <nav className="user-nav">
        {authCtx.isLogin && (
          <Fragment>
            <div className="user-nav__icon-box">
              <NavItem
                icon="/images/SVG/bookmark.svg"
                notification={0}
                type="bookmark"
              >
                <AuctionDropdown />
              </NavItem>
            </div>
            <div className="user-nav__icon-box">
              <NavItem type="Notifications">
                <NotificationDropdown />
              </NavItem>
            </div>
          </Fragment>
        )}
        {userData ? (
          <div className="user-nav__user-box">
            <NavItem
              isLogin={true}
              user={userData.username}
              credits={wallet.toLocaleString()}
              profile={
                userData.profile
                  ? userData.profile
                  : "https://bid-this-storage.s3.ap-southeast-1.amazonaws.com/profile/no-profile-2.png"
              }
            >
              <UserLoginDropdown user={userData} />
            </NavItem>
          </div>
        ) : (
          <div className="user-nav__icon-box">
            <NavItem icon="/images/SVG/user.svg" type="login">
              <UserDropdown />
            </NavItem>
          </div>
        )}
      </nav>
    </Fragment>
  );
}

export default observer(MainHeader);
