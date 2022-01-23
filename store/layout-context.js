import { createContext, useState } from "react";

const LayoutContext = createContext({
  modalType: null,
  productId: null,

  setModalType: (type) => {},
  setProductId: (id) => {},
});

export function LayoutContextProvider(props) {
  const [modalType, setModalType] = useState(null);
  const [productId, setProductId] = useState(null);

  const context = {
    modalType: modalType,
    productId: productId,

    setModalType: setModalType,
    setProductId: setProductId,
  };

  return (
    <LayoutContext.Provider value={context}>
      {props.children}
    </LayoutContext.Provider>
  );
}

export default LayoutContext;
