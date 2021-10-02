import { createContext, useState, useCallback, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";

const LOGIN_USER = gql`
  mutation ($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      user {
        id
        username
        profile
        wallet
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
  const [login] = useMutation(LOGIN_USER);
  const [logout] = useMutation(LOGOUT_USER);

  const [user, setUser] = useState(props.userData);

  const userIsLoggedIn = !!user;

  const logoutHandler = useCallback(async () => {
    try {
      const { data } = await logout();
      console.log(data.logout);
      setUser();
      Cookies.remove("token");
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
