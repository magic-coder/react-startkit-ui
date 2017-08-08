import { combineReducers } from 'redux';

import test from './test';

// 合并 reducer
const reducers = combineReducers({
  test,
});

export default reducers;
