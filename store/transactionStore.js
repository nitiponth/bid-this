import { makeAutoObservable } from "mobx";
import React from "react";

class TransactionStore {
  transactions = [];
  metadata = {
    count: 0,
    current: 0,
    limit: 10,
    offset: 0,
  };
  refetchTransactions = () => {};

  constructor() {
    makeAutoObservable(this, {});
  }

  initializeTransactions = (transactions, metadata) => {
    this.transactions = transactions;
    this.metadata = metadata;
  };

  setRefetchTransactions = (refetch) => {
    this.refetchTransactions = refetch;
  };

  updateTransaction = (newestTransactions, metadata) => {
    this.transactions = [...this.transactions, ...newestTransactions];
    this.metadata = metadata;
  };
}

const transactionStore = new TransactionStore();
export const TransactionContextStore = React.createContext(transactionStore);
export const useTransactionStore = () =>
  React.useContext(TransactionContextStore);
