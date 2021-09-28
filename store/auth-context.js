import { createContext, useState, useCallback, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      token
    }
  }
`;

const LOGOUT_USER = gql`
  mutation {
    logout
  }
`;

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

const AuthContext = createContext({
  isLogin: false,
  token: "",
  userId: "",
  login: (token) => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const [login] = useMutation(LOGIN_USER);
  const [logout] = useMutation(LOGOUT_USER);

  const [userId, setUserId] = useState();
  const { data, loading, error, refetch } = useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (loading === false && data) {
      setUserId(data.me.id);
    }
    if (loading === false && error) {
      setUserId();
      localStorage.removeItem("token");
    }
  }, [loading, data]);

  const userIsLoggedIn = !!userId;

  const logoutHandler = useCallback(async () => {
    try {
      const { data } = await logout();
      console.log(data.logout);
    } catch (e) {
      console.log(e.message);
    }
    setUserId(null);
    localStorage.removeItem("token");
    refetch();
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

      setUserId(data.login.userId);
      refetch();
    } catch (e) {
      alert(e.message);
      return false;
    }

    return true;
  };

  const context = {
    userId: userId,
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
