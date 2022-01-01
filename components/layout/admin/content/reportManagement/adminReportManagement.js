import { useState } from "react";
import SelectionBox from "../../../../etc/selection/selection";
import ReportTable from "./components/reportTable";

const filterOptions = ["ID", "Type", "Status", "Date"];
function AdminReportManagement() {
  const [selectedFilter, setSelectedFilter] = useState("ID");
  const [userSearchInput, setUserSearchInput] = useState("");

  return (
    <div className="adminContent">
      <div className="admin__header">
        <div className="header__search">
          <input
            className="header__search__input"
            placeholder="Search..."
            value={userSearchInput}
            onChange={(e) => setUserSearchInput(e.target.value)}
          />
        </div>
        <div className="header__filter">
          <p className="label"> Sort by </p>
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
        <ReportTable sortedBy={selectedFilter} searchInput={userSearchInput} />
      </div>
    </div>
  );
}

export default AdminReportManagement;
