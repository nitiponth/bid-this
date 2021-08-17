import { createContext, useState } from "react";

const LayoutContext = createContext({
  showBackdrop: false,
  layoutType: null,

  setAuth: (isShow) => {},
  setType: (type) => {},
});

export function LayoutContextProvider(props) {
  const [showAuth, setShowAuth] = useState();
  const [authType, setAuthType] = useState();

  function setAuthHandler(isShow) {
    setShowAuth(isShow);
  }

  function setTypeHandler(type) {
    setAuthType(type);
  }

  const context = {
    showBackdrop: showAuth,
    layoutType: authType,

    setAuth: setAuthHandler,
    setType: setTypeHandler,
  };

  return (
    <LayoutContext.Provider value={context}>
      {props.children}
    </LayoutContext.Provider>
  );
}

export default LayoutContext;
