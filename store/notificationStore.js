import { makeAutoObservable, toJS } from "mobx";
import React from "react";

class NotificationStore {
  notificaitonAmount = 0;
  notifications = [];
  refetchNotifications = () => {};

  constructor() {
    makeAutoObservable(this, {});
  }

  initializeNotifications = (notifications) => {
    this.notifications = notifications;
    const unseen = notifications.filter((noti) => !noti.seen);
    this.notificaitonAmount = unseen.length;
  };

  setRefetchNotifications = (refetch) => {
    this.refetchNotifications = refetch;
  };
}

const notificationStore = new NotificationStore();
export const NotificaitonContextStore = React.createContext(notificationStore);
export const useNotificationStore = () =>
  React.useContext(NotificaitonContextStore);
