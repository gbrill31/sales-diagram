import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';

import rootSaga from './sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof Function;
  }
}

const buildStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const isDev = process.env.NODE_ENV === 'development';
  const store = createStore(
    rootReducer,
    isDev && window.__REDUX_DEVTOOLS_EXTENSION__
      ? compose(
          applyMiddleware(sagaMiddleware),
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = buildStore();
