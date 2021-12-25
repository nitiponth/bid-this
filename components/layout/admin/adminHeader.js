import Link from "next/dist/client/link";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";

function AdminHeader() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="admin__header">
      <div className="header__left">
        <div className="header__left__logoBox">
          <Link href={"/"}>
            <img
              src={"/images/logo-land.png"}
              alt="logo"
              className="header__left__logo"
            />
          </Link>
        </div>
      </div>
      <div className="header__right">
        <p className="header__right__username">
          {authCtx.user?.username || null}
        </p>
      </div>
    </div>
  );
}

export default AdminHeader;
