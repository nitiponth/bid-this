import { createContext, useState, useCallback, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      token
    }
  }
`;

const ME_QUERY = gql`
  query {
    me {
      id
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
      // localStorage.removeItem("userId");
    }
  }, [loading, data]);

  const userIsLoggedIn = !!userId;

  const logoutHandler = useCallback(() => {
    setUserId(null);
    localStorage.removeItem("token");
    // localStorage.removeItem("userId");
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
      // localStorage.setItem("userId", data.login.userId);

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
