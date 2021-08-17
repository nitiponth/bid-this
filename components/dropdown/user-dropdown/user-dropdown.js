import { Fragment, useContext } from "react";

import UserDropdownItem from "./user-dropdown-item";

import LayoutContext from "../../../store/layout-context";

function UserDropdown() {
  const layoutCtx = useContext(LayoutContext);

  const showLoginLayout = () => {
    layoutCtx.setAuth(true);
    layoutCtx.setType("login");
  };

  const showRegisterLayout = () => {
    layoutCtx.setAuth(true);
    layoutCtx.setType("register");
  };

  return (
    <Fragment>
      <div className="user-dropdown">
        <UserDropdownItem
          leftIcon={"images/SVG/login.svg"}
          onClickHandler={showLoginLayout}
        >
          Sign In
        </UserDropdownItem>
        <UserDropdownItem
          leftIcon="images/SVG/edit.svg"
          onClickHandler={showRegisterLayout}
        >
          Sign Up
        </UserDropdownItem>
      </div>
    </Fragment>
  );
}

export default UserDropdown;
