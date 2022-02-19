import { makeAutoObservable, toJS } from "mobx";
import React from "react";

class NotificationStore {
  notifications = [];
  unseen = 0;
  metadata = {
    count: 0,
    current: 0,
    limit: 10,
    offset: 0,
  };
  refetchNotifications = () => {};
  fetchMore = () => {};

  constructor() {
    makeAutoObservable(this, {});
  }

  initializeNotifications = (notifications, metadata, unseen) => {
    this.notifications = notifications;
    this.unseen = unseen;
    this.metadata = metadata;
  };

  setRefetchNotifications = (refetch) => {
    this.refetchNotifications = refetch;
  };

  updateNotifications = (newestNotifications, metadata) => {
    this.notifications = [...this.notifications, ...newestNotifications];
    this.metadata = metadata;
  };
}

const notificationStore = new NotificationStore();
export const NotificaitonContextStore = React.createContext(notificationStore);
export const useNotificationStore = () =>
  React.useContext(NotificaitonContextStore);
