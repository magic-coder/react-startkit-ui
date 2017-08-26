import React from 'react';
import { Link } from 'react-router-dom';

import Panel from '@/components/panel';
import WhiteSpace from '@/components/white-space';
import WingBlank from '@/components/wing-blank';

class PanelExample extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Panel</div>
          <div className="page__desc">面板</div>
        </div>
        <div className="page__body">
          <Panel>
            <Panel.Header
              title="标题 - 页面主体"
              extra={<Link to="/" replace>详情</Link>}
            />
            <Panel.Body>
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <p>React 是一个用于构建用户界面的 JAVASCRIPT 库，主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。</p>
                  <p>React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。</p>
                  <p>React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。</p>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </Panel.Body>
            <Panel.Footer content={<Link to="/" replace>查看更多</Link>} />
          </Panel>
          <WhiteSpace size="lg" />

          <Panel>
            <Panel.Header
              title="底部内容非链接"
              extra={<span>详情</span>}
            />
            <Panel.Body>
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <p>React 是一个用于构建用户界面的 JAVASCRIPT 库，主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。</p>
                  <p>React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。</p>
                  <p>React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。</p>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </Panel.Body>
            <Panel.Footer content="底部内容" extra="其他" />
          </Panel>
          <WhiteSpace size="lg" />

          <Panel>
            <Panel.Header
              title="MORE 居中"
            />
            <Panel.Body>
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <p>React 是一个用于构建用户界面的 JAVASCRIPT 库，主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。</p>
                  <p>React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。</p>
                  <p>React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。</p>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </Panel.Body>
            <Panel.More
              center
              content={
                <Link
                  replace
                  to={{
                    pathname: '/',
                    search: '?from=panel',
                    hash: '#the-hash',
                  }}
                >
                  查看详情
                </Link>
              }
            />
          </Panel>
          <WhiteSpace size="lg" />

          <Panel>
            <Panel.Header
              title="MORE 居左"
            />
            <Panel.Body>
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <p>React 是一个用于构建用户界面的 JAVASCRIPT 库，主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。</p>
                  <p>React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。</p>
                  <p>React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。</p>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </Panel.Body>
            <Panel.More to="https://www.so.com" content="查看详情" />
          </Panel>
          <WhiteSpace size="lg" />

        </div>
      </div>
    );
  }
}

export default PanelExample;
