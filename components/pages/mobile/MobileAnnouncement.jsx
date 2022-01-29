import ScrollLock from "react-scrolllock";
import Image from "next/image";
import logo from "../../../public/images/logo-square.png";
function MobileAnnouncement({ show }) {
  if (!show) {
    return null;
  }

  return (
    <ScrollLock isActive={true}>
      <div
        className="mobileSafe"
        style={{
          backgroundColor: "rbga(0,0,0,0.9)",
        }}
      >
        <div className="mobileSafe__box">
          <Image
            src={logo}
            width={100}
            height={100}
            className="mobileSafe__logo"
          />
        </div>
        <div className="mobileSafe__title">
          Sorry, our web application currently does not support mobile devices.
        </div>
      </div>
    </ScrollLock>
  );
}

export default MobileAnnouncement;
