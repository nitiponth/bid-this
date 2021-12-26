import { Fragment, useState } from "react";
import { HiFlag } from "react-icons/hi";
import UserDropdownItem from "../user-dropdown/user-dropdown-item";

function ProfileDropdown({ setActiveReportModal }) {
  return (
    <Fragment>
      <div className="user-dropdown user-dropdown--profile">
        <UserDropdownItem
          leftIcon={<HiFlag />}
          style="red"
          onClickHandler={() => {
            setActiveReportModal(true);
          }}
        >
          <span style={{ color: "red" }}>Report</span>
        </UserDropdownItem>
      </div>
    </Fragment>
  );
}

export default ProfileDropdown;
