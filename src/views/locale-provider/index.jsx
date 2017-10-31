import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import LocaleProvider from '@/components/locale-provider';

import Page from './Page';

function getLocale(lang) {
  /* eslint-disable global-require */
  switch (lang) {
    case 'zh-CN':
      return require('../../locales/zh-Hans').default;
    case 'en-US':
      return require('../../locales/en-US').default;
    default:
      return require('../../locales/zh-Hans').default;
  }
  /* eslint-enable global-require */
}

// alert(JSON.stringify(window.Intl));

export default class LocaleProviderExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: 'en-US',
    };
  }

  onChange(lang) {
    this.setState({
      lang,
    });
  }


  render() {
    const { lang } = this.state;
    const appLocale = getLocale(lang);
    addLocaleData(...appLocale.data);

    return (
      <LocaleProvider locale={appLocale}>
        <IntlProvider
          locale={appLocale.locale}
          messages={appLocale.messages}
          formats={appLocale.formats}
        >
          <Page onChange={(currentLang) => { this.onChange(currentLang); }} />
        </IntlProvider>
      </LocaleProvider>
    );
  }
}
