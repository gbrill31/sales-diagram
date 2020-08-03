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

import { FriendsState, FriendsActionTypes } from '../types';

const INITIAL_STATE: FriendsState = {
  items: null,
  friendAttachId: null,
  getAllPending: false,
  getAllError: null,
  isNewFriendDialog: false,
  setNewFriendPending: false,
  setNewFriendError: null,
};

const friendsReducer = (
  state = INITIAL_STATE,
  action: FriendsActionTypes
): FriendsState => {
  switch (action.type) {
    case ON_REQUEST_ALL:
      return { ...state, getAllPending: true };
    case ON_REQUEST_ALL_SUCCESS:
      return {
        ...state,
        items: action.friends,
        getAllPending: false,
        getAllError: null,
      };
    case ON_REQUEST_ALL_FAILED:
      return {
        ...state,
        getAllError: action.error,
        getAllPending: false,
      };
    case ON_SET_NEW_FRIEND_DIALOG:
      return {
        ...state,
        isNewFriendDialog: action.isOpen,
      };
    case ON_SET_FRIEND_TO_ATTACH:
      return {
        ...state,
        friendAttachId: action.id,
      };
    case ON_SAVE_NEW_FRIEND:
      return {
        ...state,
        setNewFriendPending: true,
      };
    case ON_SAVE_NEW_FRIEND_SUCCESS:
      return {
        ...state,
        setNewFriendPending: false,
        setNewFriendError: null,
        isNewFriendDialog: false,
        items: Array.isArray(action.friends)
          ? [...action.friends]
          : [...state.items, action.friends],
      };
    case ON_SAVE_NEW_FRIEND_FAILED:
      return {
        ...state,
        setNewFriendPending: false,
        setNewFriendError: action.error,
      };
    default:
      return state;
  }
};

export default friendsReducer;
