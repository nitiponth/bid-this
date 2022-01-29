import { action, autorun, makeAutoObservable, toJS } from "mobx";
import React from "react";

class AccountStore {
  wallet = 0;

  constructor() {
    makeAutoObservable(this, {});
  }

  initializeWallet = (amount) => {
    this.wallet = amount;
  };

  addToWallet = (amount) => {
    this.wallet = this.wallet + amount;
  };

  removeFromWallet = (amount) => {
    this.wallet = this.wallet - amount;
  };
}

const accountStore = new AccountStore();
export const AccountContextStore = React.createContext(accountStore);
export const useAccountStore = () => React.useContext(AccountContextStore);
