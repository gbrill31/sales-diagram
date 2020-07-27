import { takeEvery, call, put } from 'redux-saga/effects';

import { FRIENDS } from '../consts';
import {
  setAllFriends,
  setAllFriendsError,
  setNewFriend,
  setNewFriendError,
} from '../actions';
import { getAll, saveNewFriend } from '../api';

function* handleGetAllFriends() {
  try {
    const friends = yield call(getAll);
    yield put(setAllFriends(friends));
  } catch (error) {
    yield put(setAllFriendsError(error));
  }
}
function* handleSaveFriend({ friend }) {
  try {
    const newFriend = yield call(saveNewFriend, friend);
    yield put(setNewFriend(newFriend));
  } catch (error) {
    yield put(setNewFriendError(error));
  }
}

export default function* watchAuth() {
  yield takeEvery(FRIENDS.ON_REQUEST_ALL, handleGetAllFriends);
  yield takeEvery(FRIENDS.ON_SAVE_NEW_FRIEND, handleSaveFriend);
}
