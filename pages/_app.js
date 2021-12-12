import AuthLayout from "../components/auth/auth";
import { LayoutContextProvider } from "../store/layout-context";
import { AuthContextProvider } from "../store/auth-context";
import { ApolloProvider } from "@apollo/client";

import fetch from "isomorphic-unfetch";
import cookie from "cookie";

import client from "../apollo-client";

import "../styles/main.css";
import { useWatchlistStore } from "../store/watchlist-store";
import { useEffect } from "react";

const QUERY_USER = {
  query: `
    query{
      me {
        id
        username
        wallet
        profile
        watchlists {
          id
        }
      }
    }
  `,
};

function MyApp({ Component, pageProps, user }) {
  const { initialWatchlist } = useWatchlistStore();

  useEffect(() => {
    if (!user?.watchlists) {
      return;
    }
    const watchedArr = user.watchlists.map((watch) => {
      return watch.id;
    });
    initialWatchlist(user.id, watchedArr);
  }, [user]);

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider userData={user}>
        <LayoutContextProvider>
          <Component {...pageProps} />
          <AuthLayout />
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

  const response = await fetch("http://localhost:4000/graphql", {
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
