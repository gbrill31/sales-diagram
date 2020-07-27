import { FRIENDS } from '../consts';

export const getAllFriends = () => ({
  type: FRIENDS.ON_REQUEST_ALL,
});
export const setAllFriends = (friends) => ({
  type: FRIENDS.ON_REQUEST_ALL_SUCCESS,
  payload: friends,
});
export const setAllFriendsError = (error) => ({
  type: FRIENDS.ON_REQUEST_ALL_FAILED,
  payload: error,
});

export const saveNewFriend = (friend) => ({
  type: FRIENDS.ON_SAVE_NEW_FRIEND,
  friend,
});
export const setNewFriend = (friend) => ({
  type: FRIENDS.ON_SAVE_NEW_FRIEND_SUCCESS,
  payload: friend,
});
export const setNewFriendError = (error) => ({
  type: FRIENDS.ON_SAVE_NEW_FRIEND_FAILED,
  payload: error,
});

export const setNewFriendDialog = (isOpen) => ({
  type: FRIENDS.ON_SET_NEW_FRIEND_DIALOG,
  payload: isOpen,
});

export const setFriendToAttach = (id) => ({
  type: FRIENDS.ON_SET_FRIEND_TO_ATTACH,
  payload: id,
});
