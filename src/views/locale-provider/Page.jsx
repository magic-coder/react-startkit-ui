import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  FormattedHTMLMessage,
  FormattedDate,
  FormattedTime,
  FormattedRelative,
  FormattedNumber,
  FormattedPlural,
} from 'react-intl';

import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';
import Pagination from '@/components/pagination';
import SearchBar from '@/components/search-bar';
import SegmentedControl from '@/components/segmented-control';


/**
 * 多语言国际化：https://github.com/ant-design/intl-example/blob/master/docs/understanding-antd-i18n.md
 * 
 * 数字格式化：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 */
export default class Page extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static contextTypes = {
    locale: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      isEnglish: true,
      unreadCount: 10,
      unreadCount2: 1,
    };
  }

  onChange(locale) {
    if (this.state.isEnglish && locale === 'en-US') {
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(locale);
    }

    this.setState({
      isEnglish: locale === 'en-US',
    });
  }

  render() {
    const { unreadCount, unreadCount2 } = this.state;
    const { locale } = this.context;

    return (
      <div className="page page__locale">
        <div className="page__header">
          <div className="page__title">LocaleProvider</div>
          <div className="page__desc">国际化</div>
        </div>
        <div className="page__body">
          <WingBlank>
            <SegmentedControl
              values={['English', '中文']}
              onChange={(ev) => {
                const lang = ev.nativeEvent.selectedSegmentIndex === 0 ? 'en-US' : 'zh-CN';
                this.onChange(lang);
              }}
            />
          </WingBlank>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">组件</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Pagination
                  className="my-pagination"
                  total={5}
                  current={3}
                  onChange={(currentPage) => {
                    console.log('当前页数是 =>>', currentPage);
                  }}
                />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <SearchBar />
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">字符串</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <FormattedMessage
                    tagName="p"
                    id="page.localeProvider.react"
                    values={{
                      name: 'React',
                    }}
                    defaultMessage="{name} 是一个用于构建用户界面的 JAVASCRIPT 库。"
                    description="{name} 是什么？"
                  />
                  <FormattedMessage
                    tagName="p"
                    id="page.localeProvider.react.html"
                    values={{
                      name: 'React',
                    }}
                    defaultMessage="<p>{ name }用于无痛创建交互式 UI。为您的应用程序中的每个状态设计简单的视图，并且当你的数据更改时，React将有效地更新和渲染正确的组件。</p><p>声明式视图使您的代码更可预测，更易于调试。</p>"
                    description="{name} 声明式"
                  />
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">字符串 - HTML标签</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <FormattedHTMLMessage
                    tagName="p"
                    id="page.localeProvider.react"
                    values={{
                      name: 'React',
                    }}
                    defaultMessage="{name} 是一个用于构建用户界面的 JAVASCRIPT 库。"
                    description="{name} 是什么？"
                  />
                  <FormattedHTMLMessage
                    tagName="div"
                    id="page.localeProvider.react.html"
                    values={{
                      name: 'React',
                    }}
                    defaultMessage="<p>{ name }用于无痛创建交互式 UI。为您的应用程序中的每个状态设计简单的视图，并且当你的数据更改时，React将有效地更新和渲染正确的组件。</p><p>声明式视图使您的代码更可预测，更易于调试。</p>"
                    description="{name} 声明式"
                  />
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">日期时间</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <p>
                    <FormattedMessage
                      id="page.localeProvider.title.date"
                      defaultMessage="当前日期："
                    />
                    <FormattedDate
                      value={Date.now()}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      id="page.localeProvider.title.time"
                      defaultMessage="当前时间："
                    />
                    <FormattedTime
                      value={Date.now()}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      id="page.localeProvider.title.relative"
                      defaultMessage="相对当前时间："
                    />
                    <FormattedRelative
                      value={Date.now()}
                    />
                  </p>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">数字量词</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <p>
                    <FormattedMessage
                      id="page.localeProvider.title.number"
                      defaultMessage="数字标逗号："
                    />
                    <FormattedNumber
                      value={10000}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      id="page.localeProvider.unreadCount"
                      defaultMessage={'你有{ unreadCount }条新信息'}
                      values={{
                        unreadCount: (
                          <strong
                            style={{
                              color: '#007fff',
                              fontWeight: 'normal',
                            }}
                          >
                            <FormattedNumber
                              value={unreadCount}
                            />
                          </strong>
                        ),
                        notifications: (
                          <FormattedPlural
                            value={unreadCount}
                            one="notification"
                            other="notifications"
                          />
                        ),
                      }}
                    />
                    <br />
                    <FormattedMessage
                      id="page.localeProvider.unreadCount"
                      defaultMessage={'你有{ unreadCount2 }条新信息'}
                      values={{
                        unreadCount: (
                          <strong
                            style={{
                              color: '#007fff',
                              fontWeight: 'normal',
                            }}
                          >
                            <FormattedNumber
                              value={unreadCount2}
                            />
                          </strong>
                        ),
                        notifications: (
                          <FormattedPlural
                            value={unreadCount2}
                            one="notification"
                            other="notifications"
                          />
                        ),
                      }}
                    />
                  </p>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">货币、百分比</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  {/* eslint-disable react/style-prop-object */}
                  <p>
                    <FormattedMessage
                      id="page.localeProvider.title.price"
                      defaultMessage="价格："
                    />
                    <FormattedNumber
                      value={123456.78}
                      style="currency"
                      currency={locale.formats.money.currency}
                    />
                  </p>
                  <p>
                    <FormattedMessage
                      id="page.localeProvider.title.percent"
                      defaultMessage="百分比："
                    />
                    <FormattedNumber
                      value={0.5}
                      style="percent"
                    />
                  </p>
                  {/* eslint-enable react/style-prop-object */}
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
