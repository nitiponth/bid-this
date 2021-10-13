import { createContext, useState } from "react";

const LayoutContext = createContext({
  showBackdrop: false,
  layoutType: null,
  productId: null,

  setAuth: (isShow) => {},
  setType: (type) => {},
  setProduct: (id) => {},
});

export function LayoutContextProvider(props) {
  const [showAuth, setShowAuth] = useState();
  const [authType, setAuthType] = useState();
  const [productId, setProductId] = useState();

  function setAuthHandler(isShow) {
    setShowAuth(isShow);
  }

  function setTypeHandler(type) {
    setAuthType(type);
  }

  const context = {
    showBackdrop: showAuth,
    layoutType: authType,
    productId: productId,

    setAuth: setAuthHandler,
    setType: setTypeHandler,
    setProduct: setProductId,
  };

  return (
    <LayoutContext.Provider value={context}>
      {props.children}
    </LayoutContext.Provider>
  );
}

export default LayoutContext;
