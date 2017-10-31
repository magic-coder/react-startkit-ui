import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import LocaleProvider from '@/components/locale-provider';

import 'babel-polyfill';

import store from './store';
import APP from './app';


/**
 * 多语言国际化
 * 
 * https://github.com/ant-design/intl-example/blob/master/docs/understanding-antd-i18n.md
 * 
 * @returns 
 */
function setLocale() {
  const languages = navigator.languages;
  const lang = languages[0];

  /* eslint-disable global-require */
  switch (lang) {
    case 'zh-CN':
      return require('./locales/zh-Hans');
    case 'en-US':
      return require('./locales/en-US');
    default:
      return require('./locales/zh-Hans');
  }
  /* eslint-enable global-require */
}

setLocale();


/*
const appLocale = {
  locale: 'en-US',
};
import './locales/zh-Hans';
import './locales/en-US';
*/
const appLocale = window.appLocale;
addLocaleData(...appLocale.data);


const rootElement = document.getElementById('root');

ReactDOM.render(
  <LocaleProvider locale={appLocale}>
    <IntlProvider
      locale={appLocale.locale}
      messages={appLocale.messages}
      formats={appLocale.formats}
    >
      <Provider store={store}>
        <APP />
      </Provider>
    </IntlProvider>
  </LocaleProvider>,
  rootElement,
);
