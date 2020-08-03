import {
  ON_REQUEST_ALL,
  ON_REQUEST_ALL_SUCCESS,
  ON_REQUEST_ALL_FAILED,
  ON_SET_NEW_FRIEND_DIALOG,
  ON_SET_FRIEND_TO_ATTACH,
  ON_SAVE_NEW_FRIEND,
  ON_SAVE_NEW_FRIEND_SUCCESS,
  ON_SAVE_NEW_FRIEND_FAILED,
} from '../types/actions';

import { Friends, AppActions } from '../types';

export const getAllFriends = (): AppActions => ({
  type: ON_REQUEST_ALL,
});
export const setAllFriends = (friends: Friends[]): AppActions => ({
  type: ON_REQUEST_ALL_SUCCESS,
  friends,
});
export const setAllFriendsError = (error: object): AppActions => ({
  type: ON_REQUEST_ALL_FAILED,
  error,
});

export const saveNewFriend = (friend: string | object): AppActions => ({
  type: ON_SAVE_NEW_FRIEND,
  friend,
});
export const setNewFriend = (friends: Friends): AppActions => ({
  type: ON_SAVE_NEW_FRIEND_SUCCESS,
  friends,
});
export const setNewFriendError = (error: object): AppActions => ({
  type: ON_SAVE_NEW_FRIEND_FAILED,
  error,
});

export const setNewFriendDialog = (isOpen: boolean): AppActions => ({
  type: ON_SET_NEW_FRIEND_DIALOG,
  isOpen,
});

export const setFriendToAttach = (id: string | number | null): AppActions => ({
  type: ON_SET_FRIEND_TO_ATTACH,
  id,
});
