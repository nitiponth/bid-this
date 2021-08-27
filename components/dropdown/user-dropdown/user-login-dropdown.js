import { useRouter } from "next/router";
import { Fragment, useContext } from "react";

import UserDropdownItem from "./user-dropdown-item";

import LayoutContext from "../../../store/layout-context";
import AuthContext from "../../../store/auth-context";
import {
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineSupport,
} from "react-icons/hi";

function UserLoginDropdown() {
  const router = useRouter();

  // const layoutCtx = useContext(LayoutContext);
  const authCtx = useContext(AuthContext);

  const toProfilePage = () => {
    router.push("/users");
  };
  const toEditProfilePage = () => {
    router.push("/users/edit");
  };

  const toSupportPage = () => {
    //support page
  };

  const toLogoutHandler = () => {
    authCtx.toLogin();
  };

  return (
    <Fragment>
      <div className="user-login-dropdown">
        <UserDropdownItem
          leftProfile={"/images/users/user2.jpg"}
          onClickHandler={toProfilePage}
        >
          View Your Profile
        </UserDropdownItem>
        <UserDropdownItem
          leftIcon={<HiOutlineCog />}
          onClickHandler={toEditProfilePage}
        >
          Setting
        </UserDropdownItem>
        <UserDropdownItem
          leftIcon={<HiOutlineSupport />}
          onClickHandler={toSupportPage}
        >
          Support
        </UserDropdownItem>
        <UserDropdownItem
          leftIcon={<HiOutlineLogout />}
          onClickHandler={toLogoutHandler}
        >
          Logout
        </UserDropdownItem>
      </div>
    </Fragment>
  );
}

export default UserLoginDropdown;
