import React from "react";
import { makeAutoObservable, action, autorun, toJS } from "mobx";

class AdminStore {
  contentState = "USER";
  productId = null;
  userId = null;
  reportId = null;

  constructor() {
    makeAutoObservable(this, {
      changeState: action,
    });
    // autorun(() => {
    //   console.log(toJS(this.contentState));
    // });
  }

  changeState = (state) => {
    this.contentState = state;
  };

  defineUserId = (userId) => {
    this.userId = userId;
  };

  defineProductId = (productId) => {
    this.productId = productId;
  };

  defineProductId = (reportId) => {
    this.productId = reportId;
  };
}

const adminStore = new AdminStore();
export const AdminContextStore = React.createContext(adminStore);
export const useAdminStore = () => React.useContext(AdminContextStore);
