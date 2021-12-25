import { createContext, useState, useCallback, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useWatchlistStore } from "./watchlist-store";

const LOGIN_USER = gql`
  mutation ($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      user {
        id
        username
        profile
        wallet
        watchlists {
          id
        }
        role
      }
      token
    }
  }
`;

const LOGOUT_USER = gql`
  mutation {
    logout
  }
`;

const AuthContext = createContext({
  isLogin: false,
  token: "",
  user: null,
  login: (token) => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const router = useRouter();
  const [login] = useMutation(LOGIN_USER);
  const [logout] = useMutation(LOGOUT_USER);
  const { initialWatchlist, clearWatchlist } = useWatchlistStore();

  const [user, setUser] = useState(props.userData);

  const userIsLoggedIn = !!user;

  const logoutHandler = useCallback(async () => {
    try {
      const { data } = await logout();
      console.log(data.logout);
      setUser();
      Cookies.remove("token");
      clearWatchlist();
      router.push("/");
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const loginHandler = async (email, password) => {
    try {
      const { data } = await login({
        variables: {
          loginEmail: email,
          loginPassword: password,
        },
      });
      if (data) {
        Cookies.set("token", data.login.token, {
          expires: 1,
        });
        setUser(data.login.user);
        const watchedArr = data.login.user.watchlists.map((watched) => {
          return watched.id;
        });
        initialWatchlist(data.login.user.id, watchedArr);
      }
    } catch (e) {
      alert(e.message);
      return false;
    }

    return true;
  };

  const context = {
    user: user,
    isLogin: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
