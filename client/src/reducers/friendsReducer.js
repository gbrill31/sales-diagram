/* eslint-disable no-underscore-dangle */
import { FRIENDS } from '../consts';

const INITIAL_STATE = {
  items: null,
  friendAttachId: null,
  getAllPending: false,
  getAllError: null,
  isNewFriendDialog: false,
  setNewFriendPending: false,
  setNewFriendError: null,
};

const friendsReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FRIENDS.ON_REQUEST_ALL:
      return { ...state, getAllPending: true };
    case FRIENDS.ON_REQUEST_ALL_SUCCESS:
      return {
        ...state,
        items: action.payload,
        getAllPending: false,
        getAllError: null,
      };
    case FRIENDS.ON_REQUEST_ALL_FAILED:
      return {
        ...state,
        getAllError: action.payload,
        getAllPending: false,
      };
    case FRIENDS.ON_SET_NEW_FRIEND_DIALOG:
      return {
        ...state,
        isNewFriendDialog: action.payload,
      };
    case FRIENDS.ON_SET_FRIEND_TO_ATTACH:
      return {
        ...state,
        friendAttachId: action.payload,
      };
    case FRIENDS.ON_SAVE_NEW_FRIEND:
      return {
        ...state,
        setNewFriendPending: true,
      };
    case FRIENDS.ON_SAVE_NEW_FRIEND_SUCCESS:
      return {
        ...state,
        setNewFriendPending: false,
        setNewFriendError: null,
        isNewFriendDialog: false,
        items: Array.isArray(action.payload)
          ? [...action.payload]
          : [...state.items, action.payload],
      };
    case FRIENDS.ON_SAVE_NEW_FRIEND_FAILED:
      return {
        ...state,
        setNewFriendPending: false,
        setNewFriendError: action.payload,
      };
    default:
      return state;
  }
};

export default friendsReducer;
