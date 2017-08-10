import React from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import InkBar from './InkBar';
import TabPane from './TabPane';

import './scss/tabs';

/**
 * 获取默认选中面板的 key
 * @param {*} props 
 */
const getDefaultActiveKey = (props) => {
  console.log('getDefaultActiveKey =>>', props);
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });

  console.log('getDefaultActiveKey =>>', activeKey);
  return activeKey;
};

export default class Tabs extends React.Component {
  static propTypes = {
    animated: PropTypes.bool,
    children: PropTypes.any.isRequired,
    defaultActiveKey: PropTypes.string,
    activeKey: PropTypes.string,
    onTabClick: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultTypes = {
    animated: false, // 是否是运动模式
    children: null,
    onTabClick: () => {},
    onChange: () => {},
  }

  constructor(props) {
    super(props);

    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = getDefaultActiveKey(props);
    }

    this.state = {
      tabsInkBarWidth: 0,
      activeKey,
      activeIndex: 0,
    };
  }

  componentWillMount = () => {
    this.setActiveIndex(this.state.activeKey);
  }

  componentDidMount = () => {
    this.getTabsInkBarWidth();
  }

  onTabClick = (activeKey) => {
    if (this.props.onTabClick) {
      this.props.onTabClick(activeKey);
    }
    this.setActiveKey(activeKey);
  }

  // 设置选中面板的 key
  setActiveKey = (activeKey) => {
    if (this.state.activeKey !== activeKey) {
      this.setActiveIndex(activeKey);

      this.setState({
        activeKey,
      });
    }
  }

  // 设置选中面板的 index
  setActiveIndex = (activeKey) => {
    const { children } = this.props;
    const activeIndex = children.findIndex((tabPane) => {
      return tabPane.key === activeKey;
    });

    if (this.props.onChange) {
      this.props.onChange(activeKey);
    }

    this.setState({
      activeIndex,
    });
  }

  getTabsInkBarWidth = () => {
    const { children } = this.props;
    const $tabsElement = this.tabsElement;
    const tabsInkBarWidth = $tabsElement.clientWidth / children.length;

    this.setState({
      tabsInkBarWidth,
    });
  }

  render() {
    const { children, animated } = this.props;
    const { tabsInkBarWidth, activeIndex, activeKey } = this.state;

    const tabsListsContent = children.map((tabItem) => {
      return (
        <Tab
          key={tabItem.key}
          tabKey={tabItem.key}
          {...tabItem.props}
          active={tabItem.key === activeKey}
          onTabClick={(key) => { this.onTabClick(key); }}
        />
      );
    });

    const tabsPanesContent = children.map((PaneItem) => {
      return (
        <TabPane
          key={PaneItem.key}
          activeKey={activeKey}
          active={PaneItem.key === activeKey}
          paneKey={PaneItem.key}
          {...PaneItem.props}
        >
          {PaneItem.props.children}
        </TabPane>
      );
    });

    return (
      <div
        className="tabs"
        ref={(ele) => { this.tabsElement = ele; }}
      >
        <div className="tabs__handle">
          <InkBar animated={animated} activeIndex={activeIndex} tabsInkBarWidth={tabsInkBarWidth} />
          {tabsListsContent}
        </div>
        <div className="tabs__content">{tabsPanesContent}</div>
      </div>
    );
  }
}
