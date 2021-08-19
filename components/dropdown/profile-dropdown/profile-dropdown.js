import { Fragment } from "react";
import UserDropdownItem from "../user-dropdown/user-dropdown-item";

function ProfileDropdown() {
  return (
    <Fragment>
      <div className="user-dropdown user-dropdown--profile">
        <UserDropdownItem leftIcon={"images/SVG/flag.svg"} style="red">
          <span style={{ color: "red" }}>Report</span>
        </UserDropdownItem>
      </div>
    </Fragment>
  );
}

export default ProfileDropdown;
