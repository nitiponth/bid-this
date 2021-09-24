import { createContext, useState, useCallback, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import useSWR from "swr";

const LOGIN_USER = gql`
  mutation ($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      token
      userId
      expired
    }
  }
`;

const ME_QUERY = gql`
  query {
    me {
      id
      username
      wallet
    }
  }
`;

// let logoutTimer;

const AuthContext = createContext({
  isLogin: false,
  token: "",
  login: (token) => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const [login] = useMutation(LOGIN_USER);

  const [userData, setUserData] = useState();
  const { data, loading, error, refetch } = useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (loading === false && data) {
      setUserData(data.me);
    }
  }, [loading, data]);

  const userId = userData;
  let initialToken;
  if (userId) {
    initialToken = userId;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  const loginHandler = async (email, password) => {
    try {
      const { data } = await login({
        variables: {
          loginEmail: email,
          loginPassword: password,
        },
      });
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("userId", data.login.userId);

      setToken(data.login.userId);
      refetch();
      console.log("login handler: " + data.login.userId);
    } catch (e) {
      alert(e.message);
    }
  };

  const context = {
    token: token,
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
