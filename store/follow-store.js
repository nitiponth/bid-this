import { action, autorun, makeAutoObservable, toJS } from "mobx";
import React from "react";
import Cookies from "js-cookie";
import { POST } from "../utils/networking/post";
class FollowStore {
  userId = null;
  following = [];

  constructor() {
    makeAutoObservable(this, {
      toggleFollowing: action,
      initialFollowing: action,
      clearFollowing: action,
      callToggleApi: action,
    });
    autorun(() => {
      console.log(toJS(this.following));
    });
  }

  initialFollowing = (userId, followingArr, api_url) => {
    this.userId = userId;
    this.following = followingArr;
  };

  toggleFollowing = async (userId) => {
    if (!this.userId) {
      return;
    }
    const idx = this.following.indexOf(userId);

    if (idx === -1) {
      this.following.push(userId);
    } else {
      this.following.splice(idx, 1);
    }

    // console.log(toJS(this.following));

    await this.callToggleApi(toJS(this.following));
  };

  callToggleApi = async (userArr) => {
    // console.log(object);
    const TOGGLE_FOLLOWING = {
      query: `
        mutation ToggleFollowingUser($userArr: [ID]!) {
          toggleFollowing(userArr: $userArr) {
            following {
              id
            }
          }
        }
      `,
      variables: {
        userArr: userArr,
      },
    };

    const response = await POST(TOGGLE_FOLLOWING);
    // const result = await response.json();

    if (response.ok) {
      // console.log("res: ", result.data.toggleFollowing.following);
    } else {
      // console.log("error!");
      console.log(response.status);
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
