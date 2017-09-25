import React from 'react';
import Button from '@/components/button';

import './scss/button';

export default class ButtonExample extends React.Component {
  state = {
    size: 'large',
    loading: false,
    iconLoading: false,
  };

  handleSizeChange(size) {
    this.setState({
      size,
    });
  }

  render() {
    return (
      <div className="page page__button">
        <div className="page__header">
          <div className="page__title">Button</div>
          <div className="page__desc">按钮</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">类型</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <div style={{ margin: '0 0.3rem' }}>
                <Button type="primary">主要按钮</Button>
                <Button type="secondary">辅助按钮</Button>
                <Button type="default">默认按钮</Button>
                <Button type="link">链接按钮</Button>
              </div>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">尺寸</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <div style={{ margin: '0 0.3rem' }}>
                <Button size={this.state.size} type="primary">主要按钮</Button>
                <Button size={this.state.size} type="secondary">辅助按钮</Button>
                <Button size={this.state.size} type="default">默认按钮</Button>
                <Button size={this.state.size} type="link">链接按钮</Button>

                <p style={{ textAlign: 'center' }}>
                  <Button type="link" onClick={() => { this.handleSizeChange('large'); }}>Large</Button>
                  <Button type="link"ton onClick={() => { this.handleSizeChange('default'); }}>Default</Button>
                  <Button type="link" onClick={() => { this.handleSizeChange('small'); }}>Small</Button>
                </p>
              </div>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">禁用</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <div style={{ margin: '0 0.3rem' }}>
                <Button disabled type="primary">主要按钮</Button>
                <Button disabled type="secondary">辅助按钮</Button>
                <Button disabled type="default">默认按钮</Button>
                <Button disabled type="link">链接按钮</Button>
              </div>
              <div style={{ margin: '0 0.3rem' }}>
                <Button type="primary">主要按钮</Button>
                <Button type="secondary">辅助按钮</Button>
                <Button type="default">默认按钮</Button>
                <Button type="link">链接按钮</Button>
              </div>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">图标</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <div style={{ margin: '0 0.3rem' }}>
                <Button icon="loading-light" type="primary">提交中</Button>
                <Button icon="search" type="secondary">搜索</Button>
                <Button icon="home" type="default">首页</Button>
                <Button icon="comments" type="link">留言</Button>
              </div>
              <div style={{ margin: '0 0.3rem' }}>
                <Button iconPosition="right" icon="loading-light" type="primary">提交中</Button>
                <Button iconPosition="right" icon="search" type="secondary">搜索</Button>
                <Button iconPosition="right" icon="home" type="default">首页</Button>
                <Button iconPosition="right" icon="comments" type="link">留言</Button>
              </div>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">满屏</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <div style={{ margin: '0 0.3rem' }}>
                <Button fullWidth icon="loading-light" type="primary">提交中</Button>
                <Button fullWidth icon="search" type="secondary">搜索</Button>
                <Button fullWidth icon="home" type="default">首页</Button>
                <Button fullWidth icon="comments" type="link">留言</Button>
              </div>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">加载中状态</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <div style={{ margin: '0 0.3rem' }}>
                <Button loading type="primary">正在提交</Button>
                <Button loading type="secondary">正在提交</Button>
                <Button loading type="default">正在提交</Button>
                <Button loading type="link">正在提交</Button>
              </div>
              <div style={{ margin: '0 0.3rem' }}>
                <Button
                  loading={this.state.loading}
                  type="primary"
                  onClick={() => {
                    console.log('设置加载中状态');
                    this.setState({
                      loading: true,
                    });

                    setTimeout(() => {
                      this.setState({
                        loading: false,
                      });
                    }, 5000);
                  }}
                >
                  Click me !
                </Button>
                <Button
                  loading={this.state.iconLoading}
                  icon="microphone"
                  type="secondary"
                  onClick={() => {
                    console.log('设置加载中状态');
                    this.setState({
                      iconLoading: true,
                    });

                    setTimeout(() => {
                      this.setState({
                        iconLoading: false,
                      });
                    }, 5000);
                  }}
                >
                  Click me !
                </Button>
              </div>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">按钮形状</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <div style={{ margin: '0 0.3rem' }}>
                <Button size="small" shape="circle" icon="loading-light" type="primary" />
                <Button size="small" shape="circle" icon="search" type="secondary" />
                <Button size="small" shape="circle" icon="home" type="default" />
              </div>
              <div style={{ margin: '0 0.3rem' }}>
                <Button shape="circle" icon="loading-light" type="primary" />
                <Button shape="circle" icon="search" type="secondary" />
                <Button shape="circle" icon="home" type="default" />
              </div>
              <div style={{ margin: '0 0.3rem' }}>
                <Button size="large" shape="circle" icon="loading-light" type="primary" />
                <Button size="large" shape="circle" icon="search" type="secondary" />
                <Button size="large" shape="circle" icon="home" type="default" />
              </div>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">幽灵按钮</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <div style={{ background: 'rgb(200, 200, 200)', padding: '0.3rem', margin: '0 0.3rem' }}>
                <Button ghost icon="loading" type="primary">提交中</Button>
                <Button ghost icon="search" type="secondary">搜索</Button>
                <Button ghost icon="home" type="default">首页</Button>
                <Button ghost icon="comments" type="link">留言</Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
