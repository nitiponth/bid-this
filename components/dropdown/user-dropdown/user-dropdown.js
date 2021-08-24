import { Fragment, useContext } from "react";

import UserDropdownItem from "./user-dropdown-item";

import LayoutContext from "../../../store/layout-context";
import { BiLogIn } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";

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
          leftIcon={<BiLogIn />}
          onClickHandler={showLoginLayout}
        >
          Sign In
        </UserDropdownItem>
        <UserDropdownItem
          leftIcon={<HiPencil />}
          onClickHandler={showRegisterLayout}
        >
          Sign Up
        </UserDropdownItem>
      </div>
    </Fragment>
  );
}

export default UserDropdown;
