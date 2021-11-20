import React from "react";
import { makeAutoObservable, action, autorun, toJS } from "mobx";

class AdminStore {
  contentState = "USER";

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
}

const adminStore = new AdminStore();
export const AdminContextStore = React.createContext(adminStore);
export const useAdminStore = () => React.useContext(AdminContextStore);
