import { all } from 'redux-saga/effects';

import friendsSaga from './friendsSaga';

export default function* rootSaga() {
  yield all([friendsSaga()]);
}
