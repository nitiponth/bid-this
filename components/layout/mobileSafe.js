import Mobile from "../../hoc/mobile";
import MobileAnnouncement from "../pages/mobile/MobileAnnouncement";
import { isMobile } from "react-device-detect";
function MobileSafe() {
  return (
    <Mobile>
      <MobileAnnouncement show={isMobile} />
    </Mobile>
  );
}

export default MobileSafe;
