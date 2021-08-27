import { useContext } from "react";
import Portal from "../../hoc/portal";
import LayoutContext from "../../store/layout-context";
import Backdrop from "../layout/backdrop";
import BidItem from "../pages/bid/bid-item";

import Login from "./login";
import Register from "./register";

export default function AuthLayout(props) {
  const layoutCtx = useContext(LayoutContext);

  if (!layoutCtx.showBackdrop) return null;
  return (
    <Portal>
      <Backdrop show={layoutCtx.showBackdrop}>
        {layoutCtx.layoutType == "login" && (
          <div className="auth__layout">
            <Login />
          </div>
        )}
        {layoutCtx.layoutType == "register" && (
          <div className="auth__layout">
            <Register />
          </div>
        )}
        {layoutCtx.layoutType == "bid" && <BidItem />}
      </Backdrop>
    </Portal>
  );
}
