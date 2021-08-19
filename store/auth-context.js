import { createContext, useState } from "react";

const AuthContext = createContext({
  isLogin: false,

  setLogin: (sign) => {},
});

export function AuthLayoutProvider(props) {
  const [isLoginState, setIsLoginState] = useState(false);

  function loginHandler() {
    setIsLoginState(!isLoginState);
  }

  const context = {
    isLogin: isLoginState,

    toLogin: loginHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
