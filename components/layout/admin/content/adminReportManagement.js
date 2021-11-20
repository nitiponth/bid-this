import { useState } from "react";
import SelectionBox from "../../../etc/selection/selection";

const filterOptions = ["Sort by A", "Sort by B", "Sort by C", "Sort by D"];
function AdminReportManagement() {
  const [selectedFilter, setSelectedFilter] = useState("Select Filter");
  return (
    <div className="adminContent">
      <div className="admin__header">
        <div className="header__search">
          <input className="header__search__input" placeholder="Search..." />
        </div>
        <div className="header__filter">
          <p className="label"> Filter </p>
          <div className="header__filter__selection">
            <SelectionBox
              options={filterOptions}
              selected={selectedFilter}
              setSelected={setSelectedFilter}
            />
          </div>
        </div>
      </div>
      <div className="admin__content">
        <div>Report Management Page</div>
      </div>
    </div>
  );
}

export default AdminReportManagement;
