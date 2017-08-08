import { TEST_REDUCER } from '@/actionTypes';

const test = (state = 'test reducer', action) => {
  switch (action.type) {
    case TEST_REDUCER:
      return state;
    default:
      return state;
  }
};

export default test;
