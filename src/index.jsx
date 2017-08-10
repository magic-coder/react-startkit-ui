import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import store from './store';
import APP from './app';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <APP />
  </Provider>,
  rootElement,
);
