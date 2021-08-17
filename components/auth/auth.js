import { useContext } from "react";
import Portal from "../../hoc/portal";
import LayoutContext from "../../store/layout-context";
import Backdrop from "../layout/backdrop";

import Login from "./login";
import Register from "./register";

export default function AuthLayout(props) {
  const layoutCtx = useContext(LayoutContext);

  if (!layoutCtx.showBackdrop) return null;
  return (
    <Portal>
      <Backdrop show={layoutCtx.showBackdrop}>
        <div className="auth__layout">
          {layoutCtx.layoutType == "login" && <Login />}
          {layoutCtx.layoutType == "register" && <Register />}
        </div>
      </Backdrop>
    </Portal>
  );
}
