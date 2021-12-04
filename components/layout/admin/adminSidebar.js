import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useAdminStore } from "../../../store/admin-Content-Store";
import { useRouter } from "next/router";

function AdminSidebar() {
  const [contentState, setContentState] = useState("USER");
  const { changeState } = useAdminStore();

  const router = useRouter();

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
          changeState("USER");
          router.push("/admin");
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
          changeState("PRODUCT");
          router.push("/admin");
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
          changeState("REPORT");
          router.push("/admin");
        }}
      >
        Report
      </div>
    </div>
  );
}

export default observer(AdminSidebar);
