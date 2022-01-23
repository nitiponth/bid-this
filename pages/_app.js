import { LayoutContextProvider } from "../store/layout-context";
import { AuthContextProvider } from "../store/auth-context";
import { ApolloProvider } from "@apollo/client";

import fetch from "isomorphic-unfetch";
import cookie from "cookie";

import client from "../apollo-client";

import "../styles/main.css";
import { useWatchlistStore } from "../store/watchlist-store";
import { useEffect } from "react";
import { useFollowStore } from "../store/follow-store";
import ModalComp from "../components/layout/modalComponents";

const QUERY_USER = {
  query: `
    query{
      me {
        id
        username
        wallet
        profile
        status
        watchlists {
          id
        }
        following{
          id
        }
        role
      }
    }
  `,
};

function MyApp({ Component, pageProps, user }) {
  const { initialWatchlist } = useWatchlistStore();
  const { initialFollowing } = useFollowStore();

  useEffect(() => {
    if (!user) {
      return;
    }
    const watchedArr = user.watchlists.map((watch) => {
      return watch.id;
    });
    const followingArr = user.following.map((user) => {
      return user.id;
    });

    console.log(user.id);

    initialWatchlist(user.id, watchedArr);
    initialFollowing(user.id, followingArr);
  }, [user]);

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider userData={user}>
        <LayoutContextProvider>
          <Component {...pageProps} />
          <ModalComp />
        </LayoutContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
  if (process.browser) {
    return { user: null };
  }

  const { headers } = ctx.req;
  // console.log(headers.cookie);

  const cookies = headers && cookie.parse(headers.cookie || "");
  const token = cookies && (cookies.token || "");

  const response = await fetch(process.env.API_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(QUERY_USER),
  });

  // console.log(response.ok);

  if (response.ok) {
    const result = await response.json();
    return { user: result.data.me };
  } else {
    return { user: null };
  }
};
