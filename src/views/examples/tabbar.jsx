import React from 'react';

import Icon from '@/components/icon';
import TabBar from '@/components/tab-bar';

// import iconBack from '@/assets/svg/back.svg';
// import iconFriend from '@/assets/svg/friend.svg';
// import iconFriendFill from '@/assets/svg/friend-fill.svg';

// console.log(iconFriend);

// const callback = (key) => {
//   console.log('onChange', key);
// };

// const handleTabClick = (key) => {
//   console.log('onTabClick', key);
// };

export default class TabBarExample extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'friendTab',
      hidden: false,
    };
  }

  /**
   * 渲染 内容
   * @param {*} pageText 
   */
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>你已点击 “{pageText}” tab， 当前展示 “{pageText}” 信息</div>
        <a
          role="button"
          tabIndex="0"
          style={{
            display: 'block',
            marginTop: '2rem',
            marginBottom: '6rem',
          }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          点击切换 tab-bar 显示/隐藏
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="page">
        <div className="page__header">
          <div className="page__title">TabBar</div>
          <div className="page__desc">标签栏</div>
        </div>
        <div className="page__body">
          <TabBar
            className="my-tabbar"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="首页"
              badge={1}
              selected={this.state.selectedTab === 'homeTab'}
              icon={<div style={{
                width: '0.44rem',
                height: '0.44rem',
                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '0.44rem',
                height: '0.44rem',
                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
              />
              }
              onClick={() => {
                this.setState({
                  selectedTab: 'homeTab',
                });
              }}
            >
              {this.renderContent('首页')}
            </TabBar.Item>
            <TabBar.Item
              title="消息"
              key="消息"
              dot
              selected={this.state.selectedTab === 'messageTab'}
              icon={<Icon type="message" />}
              selectedIcon={<Icon type="message-fill" />}
              onClick={() => {
                this.setState({
                  selectedTab: 'messageTab',
                });
              }}
            >
              {this.renderContent('消息')}
            </TabBar.Item>
            <TabBar.Item
              title="朋友"
              key="朋友"
              badge="new"
              selected={this.state.selectedTab === 'friendTab'}
              icon={<div style={{
                width: '0.44rem',
                height: '0.44rem',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
              />
              }
              selectedIcon={<div style={{
                width: '0.44rem',
                height: '0.44rem',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
              />
              }
              onClick={() => {
                this.setState({
                  selectedTab: 'friendTab',
                });
              }}
            >
              {this.renderContent('朋友')}
            </TabBar.Item>
            <TabBar.Item
              title="我"
              key="我"
              selected={this.state.selectedTab === 'meTab'}
              icon={<Icon type="me" />}
              selectedIcon={<Icon type="me-fill" />}
              onClick={() => {
                this.setState({
                  selectedTab: 'meTab',
                });
              }}
            >
              {this.renderContent('我')}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}
