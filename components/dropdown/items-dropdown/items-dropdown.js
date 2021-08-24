import { Fragment } from "react";
import { HiFlag, HiOutlineHeart } from "react-icons/hi";
import UserDropdownItem from "../user-dropdown/user-dropdown-item";

function ItemsDropdown() {
  return (
    <Fragment>
      <div className="user-dropdown user-dropdown--items">
        <UserDropdownItem leftIcon={<HiOutlineHeart />}>
          Add to watchlists
        </UserDropdownItem>
        {/* <UserDropdownItem leftIcon="images/SVG/heart-outlined.svg">
          Remove from watchlists
        </UserDropdownItem> */}
        <UserDropdownItem leftIcon={<HiFlag />} style="red">
          <span style={{ color: "#E85B51" }}>Report</span>
        </UserDropdownItem>
      </div>
    </Fragment>
  );
}

export default ItemsDropdown;
