import { Friends } from './interfaces';

export const ON_REQUEST_ALL = 'ON_REQUEST_ALL';
export const ON_REQUEST_ALL_SUCCESS = 'ON_REQUEST_ALL_SUCCESS';
export const ON_REQUEST_ALL_FAILED = 'ON_REQUEST_ALL_FAILED';
export const ON_SET_NEW_FRIEND_DIALOG = 'ON_SET_NEW_FRIEND_DIALOG';
export const ON_SET_FRIEND_TO_ATTACH = 'ON_SET_FRIEND_TO_ATTACH';
export const ON_SAVE_NEW_FRIEND = 'ON_SAVE_NEW_FRIEND';
export const ON_SAVE_NEW_FRIEND_SUCCESS = 'ON_SAVE_NEW_FRIEND_SUCCESS';
export const ON_SAVE_NEW_FRIEND_FAILED = 'ON_SAVE_NEW_FRIEND_FAILED';

export interface GetAllFriends {
  type: typeof ON_REQUEST_ALL;
}

export interface SetAllFriends {
  type: typeof ON_REQUEST_ALL_SUCCESS;
  friends: Friends[] | null;
}

export interface SetAllFriendsError {
  type: typeof ON_REQUEST_ALL_FAILED;
  error: object | string | null;
}

export interface SaveNewFriend {
  type: typeof ON_SAVE_NEW_FRIEND;
  friend: object | string;
}

export interface SetNewFriend {
  type: typeof ON_SAVE_NEW_FRIEND_SUCCESS;
  friends: Friends;
}

export interface SetNewFriendError {
  type: typeof ON_SAVE_NEW_FRIEND_FAILED;
  error: object | string;
}

export interface SetNewFriendDialog {
  type: typeof ON_SET_NEW_FRIEND_DIALOG;
  isOpen: boolean;
}

export interface SetFriendToAttach {
  type: typeof ON_SET_FRIEND_TO_ATTACH;
  id: string | number | null;
}

export type FriendsActionTypes =
  | GetAllFriends
  | SetAllFriends
  | SetAllFriendsError
  | SaveNewFriend
  | SetNewFriend
  | SetNewFriendError
  | SetNewFriendDialog
  | SetFriendToAttach;

export type AppActions = FriendsActionTypes;
