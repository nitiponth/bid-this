import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useNotificationStore } from "../../../store/notificationStore";
import NotificationItem from "./NotificationItem";

function NotificationDropdown() {
  const { notifications, notificaitonAmount } = useNotificationStore();

  const compList = notifications.map((noti) => {
    return <NotificationItem />;
  });

  return (
    <Fragment>
      <div className="user-dropdown user-dropdown--auction">{compList}</div>
    </Fragment>
  );
}

export default observer(NotificationDropdown);
