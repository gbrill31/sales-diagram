import { takeEvery, call, put } from 'redux-saga/effects';

import { ON_REQUEST_ALL, ON_SAVE_NEW_FRIEND } from '../types/actions';
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
function* handleSaveFriend({ friend }: any) {
  try {
    const newFriend = yield call(saveNewFriend, friend);
    yield put(setNewFriend(newFriend));
  } catch (error) {
    yield put(setNewFriendError(error));
  }
}

export default function* watchAuth() {
  yield takeEvery(ON_REQUEST_ALL, handleGetAllFriends);
  yield takeEvery(ON_SAVE_NEW_FRIEND, handleSaveFriend);
}
