import { action, autorun, makeAutoObservable, toJS } from "mobx";
import React from "react";

class WatchlistStore {
  userId = null;
  watchlist = [];

  constructor() {
    makeAutoObservable(this, {
      toggleProductWatched: action,
      initialWatchlist: action,
      clearWatchlist: action,
    });
    // autorun(() => {
    //   console.log(toJS(this.watchlist));
    // });
  }

  initialWatchlist = (userId, watchedArr) => {
    this.userId = userId;
    this.watchlist = watchedArr;
  };

  toggleProductWatched = (prodId) => {
    if (this.userId === null) {
      return;
    }

    const idx = this.watchlist.indexOf(prodId);

    if (idx === -1) {
      this.watchlist.push(prodId);
    } else {
      this.watchlist.splice(idx, 1);
    }
  };

  clearWatchlist = () => {
    this.userId = null;
    this.watchlist = [];
  };
}

const watchlistStore = new WatchlistStore();
export const WatchlistContextStore = React.createContext(watchlistStore);
export const useWatchlistStore = () => React.useContext(WatchlistContextStore);
