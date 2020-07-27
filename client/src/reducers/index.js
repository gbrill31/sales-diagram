import { combineReducers } from 'redux';

import friendsReucer from './friendsReducer';

const rootReducer = combineReducers({
  friends: friendsReucer,
});

export default rootReducer;
