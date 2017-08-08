import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import reducers from '@/reducers';
import thunk from 'redux-thunk';

const composes = [applyMiddleware(thunk, logger)];

if (process.env.NODE_ENV === 'development') {
  if (window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__) {
    composes.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }
}

const store = createStore(
  reducers,
  compose(...composes),
);

export default store;
