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
  const authCtx = useContext(AuthContext);

  const toProfilePage = () => {
    router.push(`/users/${authCtx.user.id}`);
  };
  const toEditProfilePage = () => {
    router.push("/users/edit");
  };

  const toManagementPage = () => {
    router.push("/admin");
  };

  const toLogoutHandler = async () => {
    await authCtx.logout();
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
        {props.user?.role === "ADMIN" && (
          <UserDropdownItem
            leftIcon={<HiOutlineSupport />}
            onClickHandler={toManagementPage}
          >
            Management
          </UserDropdownItem>
        )}
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
