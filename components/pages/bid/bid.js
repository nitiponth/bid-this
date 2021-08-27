import { useContext } from "react";
import Portal from "../../../hoc/portal";
import LayoutContext from "../../../store/layout-context";
import Backdrop from "../../layout/backdrop";
import BidItem from "./bid-item";

function Bid() {
  const layoutCtx = useContext(LayoutContext);
  if (!layoutCtx.showBackdrop) return null;
  return (
    // <Portal>
    <Backdrop show={layoutCtx.showBackdrop}>
      {layoutCtx.layoutType == "bid" && <BidItem />}
    </Backdrop>
    // </Portal>
  );
}

export default Bid;
