import React from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
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
    // animated: PropTypes.bool,
    children: PropTypes.any.isRequired,
    // renderTabBar: PropTypes.func,
    // renderTabContent: PropTypes.func,
    defaultActiveKey: PropTypes.string,
    activeKey: PropTypes.string,
  }

  static defaultTypes = {
    // animated: false, // 是否是运动模式
    children: null,
    // renderTabBar: () => {},
    // renderTabContent: () => {},
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

    console.log('activeKey ==>>>', activeKey);

    this.state = {
      tabsInkBarWidth: 0,
      activeKey,
      activeIndex: 0,
    };
  }

  componentWillMount = () => {}

  componentDidMount = () => {
    console.log(this.tabsElement);
    this.getTabsInkBarWidth();
  }

  getTabsInkBarWidth = () => {
    const { children } = this.props;
    const { activeKey } = this.state;
    const $tabsElement = this.tabsElement;
    const activeIndex = children.findIndex((tabPane) => {
      return tabPane.key === activeKey;
    });
    const tabsInkBarWidth = $tabsElement.clientWidth / children.length;

    this.setState({
      activeIndex,
      tabsInkBarWidth,
    });
  }

  render() {
    const {
      children,
    } = this.props;

    const { tabsInkBarWidth, activeIndex } = this.state;

    const tabsListsContent = children.map((tabItem) => {
      return (
        <Tab key={tabItem.key} {...tabItem.props} />        
      );
    });

    const tabsPanesContent = children.map((PaneItem) => {
      return (
        <TabPane key={PaneItem.key} {...this.props}>{PaneItem.props.children}</TabPane>
      );
    });

    const tabsContent = [];

    return (
      <div
        className="tabs"
        ref={(ele) => { this.tabsElement = ele; }}
      >
        {tabsContent}
        <div className="tabs__handle">
          <div
            className="tabs__ink__bar"
            style={{
              display: 'block',
              transform: `translate3d(${tabsInkBarWidth * activeIndex}px, 0px, 0px)`,
              width: `${tabsInkBarWidth}px`,
            }}
          />
          {tabsListsContent}
        </div>
        <div className="tabs__content">{tabsPanesContent}</div>
      </div>
    );
  }
}
