import { action, autorun, makeAutoObservable, toJS } from "mobx";
import React from "react";

class FollowStore {
  userId = null;
  following = [];

  constructor() {
    makeAutoObservable(this, {
      toggleFollowing: action,
      initialFollowing: action,
      clearFollowing: action,
    });
    // autorun(() => {
    //   console.log(toJS(this.following));
    // });
  }

  initialFollowing = (userId, followingArr) => {
    this.userId = userId;
    this.following = followingArr;
  };

  toggleFollowing = (userId) => {
    if (!this.userId) {
      return;
    }
    const idx = this.following.indexOf(userId);

    if (idx === -1) {
      this.following.push(userId);
    } else {
      this.following.splice(idx, 1);
    }
  };

  clearFollowing = () => {
    this.userId = null;
    this.following = [];
  };
}

const followStore = new FollowStore();
export const FollowContextStore = React.createContext(followStore);
export const useFollowStore = () => React.useContext(FollowContextStore);
