import { FRIENDS } from '../consts';

import { Friends } from '../interfaces';

export const getAllFriends = () => ({
  type: FRIENDS.ON_REQUEST_ALL,
});
export const setAllFriends = (friends: Friends[]) => ({
  type: FRIENDS.ON_REQUEST_ALL_SUCCESS,
  payload: friends,
});
export const setAllFriendsError = (error: object) => ({
  type: FRIENDS.ON_REQUEST_ALL_FAILED,
  payload: error,
});

export const saveNewFriend = (friend: string) => ({
  type: FRIENDS.ON_SAVE_NEW_FRIEND,
  friend,
});
export const setNewFriend = (friend: Friends) => ({
  type: FRIENDS.ON_SAVE_NEW_FRIEND_SUCCESS,
  payload: friend,
});
export const setNewFriendError = (error: object) => ({
  type: FRIENDS.ON_SAVE_NEW_FRIEND_FAILED,
  payload: error,
});

export const setNewFriendDialog = (isOpen: boolean) => ({
  type: FRIENDS.ON_SET_NEW_FRIEND_DIALOG,
  payload: isOpen,
});

export const setFriendToAttach = (id: string | number | null) => ({
  type: FRIENDS.ON_SET_FRIEND_TO_ATTACH,
  payload: id,
});
