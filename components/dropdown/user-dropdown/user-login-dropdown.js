import { useRouter } from "next/router";
import { Fragment, useContext } from "react";

import UserDropdownItem from "./user-dropdown-item";

import LayoutContext from "../../../store/layout-context";
import AuthContext from "../../../store/auth-context";

function UserLoginDropdown() {
  const router = useRouter();

  const layoutCtx = useContext(LayoutContext);
  const authCtx = useContext(AuthContext);

  const toProfilePage = () => {
    router.push("/users");
  };

  const showRegisterLayout = () => {
    layoutCtx.setAuth(true);
    layoutCtx.setType("register");
  };

  const toLogoutHandler = () => {
    authCtx.toLogin();
  };

  return (
    <Fragment>
      <div className="user-login-dropdown">
        <UserDropdownItem
          leftProfile={"images/users/user2.jpg"}
          onClickHandler={toProfilePage}
        >
          View Your Profile
        </UserDropdownItem>
        <UserDropdownItem
          leftIcon="images/SVG/cog.svg"
          onClickHandler={showRegisterLayout}
        >
          Setting
        </UserDropdownItem>
        <UserDropdownItem
          leftIcon="images/SVG/lifebuoy.svg"
          onClickHandler={showRegisterLayout}
        >
          Support
        </UserDropdownItem>
        <UserDropdownItem
          leftIcon="images/SVG/log-out.svg"
          onClickHandler={toLogoutHandler}
        >
          Logout
        </UserDropdownItem>
      </div>
    </Fragment>
  );
}

export default UserLoginDropdown;
