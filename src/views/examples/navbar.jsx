import React from 'react';

import NavBar from '@/components/nav-bar';
import Icon from '@/components/icon';
import WhiteSpace from '@/components/white-space';

export default class NavBarExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasLoading: false,
    };
  }

  toggleLoading = () => {
    this.setState({
      hasLoading: !this.state.hasLoading,
    });
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">NavBar</div>
          <div className="page__desc">导航栏</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">模式</div>
            <div className="demo__preview__content">
              <NavBar
                className="my-navbar"
                mode="light"
                rightContent={[
                  <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                  <Icon key="1" type="ellipsis" />,
                ]}
              >
                浅色导航栏
              </NavBar>
              <WhiteSpace />
              <NavBar
                className="my-navbar"
                mode="dark"
                rightContent={[
                  <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                  <Icon key="1" type="ellipsis" />,
                ]}
              >
                深色导航栏
              </NavBar>
            </div>
          </div>
          <WhiteSpace size="xl" />

          <div className="demo__preview">
            <div className="demo__preview__title">长标题</div>
            <div className="demo__preview__content">
              <NavBar
                className="my-navbar"
                mode="light"
                rightContent={[
                  <Icon key="1" type="ellipsis" />,
                ]}
              >
                我是长标题的导航栏超出的部分应该会显示省略号
              </NavBar>
            </div>
          </div>
          <WhiteSpace size="xl" />

          <div className="demo__preview">
            <div className="demo__preview__title">宽度自适应</div>
            <div className="demo__preview__content">
              <NavBar
                className="my-navbar"
                auto
                mode="light"
                rightContent={[
                  <Icon key="1" type="ellipsis" />,
                ]}
              >
                自适应的导航栏
              </NavBar>
              <WhiteSpace />
              <NavBar
                className="my-navbar"
                auto
                mode="light"
                leftContent={false}
                rightContent={[
                  <Icon key="1" type="ellipsis" />,
                ]}
              >
                自适应的导航栏
              </NavBar>
            </div>
          </div>
          <WhiteSpace size="xl" />

          <div className="demo__preview">
            <div className="demo__preview__title">标题显示 loading</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <NavBar
                className="my-navbar"
                auto
                hasLoading={this.state.hasLoading}
                leftContent={false}
                rightContent={[
                  <Icon key="1" type="ellipsis" />,
                ]}
              >
                导航标题
              </NavBar>
              <WhiteSpace />
              <div style={{ padding: '0.32rem', textAlign: 'center' }}>
                <a href="javascript:;" onClick={this.toggleLoading}>
                  {this.state.hasLoading ? '隐藏 loading' : '显示 loading'}
                </a>
              </div>
            </div>
          </div>
          <WhiteSpace size="xl" />

          <div className="demo__preview">
            <div className="demo__preview__title">导航左边点击回调</div>
            <div className="demo__preview__content">
              <NavBar
                className="my-navbar"
                mode="light"
                onLeftClick={() => { console.log('onLeftClick'); }}
                rightContent={[
                  <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                  <Icon key="1" type="ellipsis" />,
                ]}
              >
                导航标题
              </NavBar>
              <WhiteSpace />
              <NavBar
                className="my-navbar"
                onLeftClick={() => { console.log('onLeftClick'); }}
                rightContent={[
                  <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
                  <Icon key="1" type="ellipsis" />,
                ]}
              >
                导航标题
              </NavBar>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
