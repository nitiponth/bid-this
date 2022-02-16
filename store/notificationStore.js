import { makeAutoObservable } from "mobx";
import React from "react";

class NotificationStore {
  notificaitonAmount = 0;
  notifications = [];

  constructor() {
    makeAutoObservable(this, {});
  }

  initializeNotifications = (notifications) => {
    this.notifications = notifications;
    this.notificaitonAmount = notifications.length;
  };
}

const notificationStore = new NotificationStore();
export const NotificaitonContextStore = React.createContext(notificationStore);
export const useNotificationStore = () =>
  React.useContext(NotificaitonContextStore);
