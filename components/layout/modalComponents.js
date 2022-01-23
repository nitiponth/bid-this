import { useContext, useEffect } from "react";
import Portal from "../../hoc/portal";
import LayoutContext from "../../store/layout-context";
import Backdrop from "./backdrop";
import BidItem from "../pages/bid/bid-item";

import Login from "../auth/login";
import Register from "../auth/register";
import BVerify from "../organisms/BVerify/bVerify";

export default function ModalComp(props) {
  const layoutCtx = useContext(LayoutContext);

  const { modalType, setModalType, setProductId } = layoutCtx;

  const closeModalHandler = () => {
    setProductId(null);
    setModalType(null);
  };
  return (
    <Portal>
      <Backdrop show={modalType == "login"} onClose={closeModalHandler}>
        <Login />
      </Backdrop>
      <Backdrop show={modalType == "register"} onClose={closeModalHandler}>
        <Register />
      </Backdrop>
      <Backdrop show={modalType == "bid"} onClose={closeModalHandler}>
        <BidItem onClose={closeModalHandler} />
      </Backdrop>
      <BVerify active={modalType === "verify"} onClose={closeModalHandler} />
    </Portal>
  );
}
