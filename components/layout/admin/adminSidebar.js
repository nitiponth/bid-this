import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useAdminStore } from "../../../store/admin-Content-Store";

function AdminSidebar() {
  const [contentState, setContentState] = useState("USER");
  const { changeState } = useAdminStore();

  useEffect(() => {
    changeState(contentState);
  }, [contentState]);

  return (
    <div className="sidebarContainer">
      <div
        className={
          contentState === "USER"
            ? "sidebar__item sidebar__item--actived"
            : "sidebar__item"
        }
        onClick={() => {
          setContentState("USER");
        }}
      >
        User
      </div>
      <div
        className={
          contentState === "PRODUCT"
            ? "sidebar__item sidebar__item--actived"
            : "sidebar__item"
        }
        onClick={() => {
          setContentState("PRODUCT");
        }}
      >
        Product
      </div>
      <div
        className={
          contentState === "REPORT"
            ? "sidebar__item sidebar__item--actived"
            : "sidebar__item"
        }
        onClick={() => {
          setContentState("REPORT");
        }}
      >
        Report
      </div>
    </div>
  );
}

export default observer(AdminSidebar);
