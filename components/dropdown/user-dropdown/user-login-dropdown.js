import { useRouter } from "next/router";
import { Fragment, useContext } from "react";

import UserDropdownItem from "./user-dropdown-item";

import AuthContext from "../../../store/auth-context";
import {
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineSupport,
} from "react-icons/hi";

function UserLoginDropdown(props) {
  const router = useRouter();

  // const layoutCtx = useContext(LayoutContext);
  const authCtx = useContext(AuthContext);

  const toProfilePage = () => {
    router.push(`/users/${authCtx.userId}`);
  };
  const toEditProfilePage = () => {
    router.push("/users/edit");
  };

  const toSupportPage = () => {
    //support page
  };

  const toLogoutHandler = () => {
    authCtx.logout();
    router.push("/");
    // router.reload();
  };

  return (
    <Fragment>
      <div className="user-login-dropdown">
        <UserDropdownItem
          leftProfile={
            props.user.profile
              ? props.user.profile
              : "/images/users/no-profile.jpg"
          }
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
