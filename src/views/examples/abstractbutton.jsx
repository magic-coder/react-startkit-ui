import React from 'react';

import WhiteSpace from '@/components/white-space';
import WingBlank from '@/components/wing-blank';
import AbstractButton from '@/components/internal';

import './scss/abstractButton';

export default class AbstractButtonExample extends React.Component {
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Abstract Button</div>
          <div className="page__desc">抽象的按钮类型</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">路由</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-link"
                  to="/"
                >
                  基本
                </AbstractButton>

                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-link"
                  to={{
                    pathname: '/courses',
                    search: '?sort=name',
                    hash: '#the-hash',
                    state: { fromDashboard: true },
                  }}
                >
                  to 参数 - 对象
                </AbstractButton>

                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-link"
                  to="/"
                  replace
                >
                  替换当前页面
                </AbstractButton>
                <WhiteSpace />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">按钮</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-button"
                >
                  buttom 标签
                </AbstractButton>

                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-button"
                  tag="a"
                >
                  a 链接标签
                </AbstractButton>

                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-button"
                  tag="a"
                  href="/icon"
                >
                  a 标签 - 页面跳转
                </AbstractButton>
                <WhiteSpace />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">自定义样式/禁用</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-button"
                  style={{
                    backgroundColor: '#f30',
                  }}
                >
                  buttom 标签
                </AbstractButton>

                <AbstractButton
                  className="my-button"
                  disabled
                  style={{
                    backgroundColor: '#f30',
                  }}
                >
                  buttom 标签 - 禁用
                </AbstractButton>

                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-button"
                  tag="a"
                  href="/icon"
                  style={{
                    color: '#333',
                  }}
                >
                  a 链接标签
                </AbstractButton>
                <AbstractButton
                  className="my-button"
                  disabled
                  tag="a"
                  href="/icon"
                  style={{
                    color: '#333',
                  }}
                >
                  a 链接标签 - 禁用
                </AbstractButton>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">点击回调</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <AbstractButton
                  className="my-button"
                  onClick={() => {
                    const msg = 'Button 标签的按钮被点击 ~';
                    console.log(msg);
                    alert(msg);
                  }}
                >
                  buttom 标签
                </AbstractButton>
                <AbstractButton
                  className="my-button"
                  tag="a"
                  onClick={() => {
                    const msg = 'a 标签的按钮被点击 ~';
                    console.log(msg);
                    alert(msg);
                  }}
                >
                  a 标签按钮
                </AbstractButton>
                <WhiteSpace size="lg" />

              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
