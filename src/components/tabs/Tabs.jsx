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
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
};

export default class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    defaultActiveKey: PropTypes.string, // 初始化选中面板的 key
    animated: PropTypes.bool, // 是否动画
    swipeable: PropTypes.bool, // 是否可以滑动 tab 内容进行切换
    activeKey: PropTypes.string,
    onTabClick: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    animated: false,
    swipeable: true,
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
      slide: {
        isStartDrag: false,
        startTime: 0,
        startX: 0,
        distanceX: 0,
        movePercent: 0,
      },
    };
  }

  componentWillMount = () => {
    this.setActiveIndex(this.state.activeKey);
  }

  componentDidMount = () => {
    this.getTabsInkBarWidth();
  }

  /**
   * tab 点击事件
   */
  onTabClick = (activeKey) => {
    if (this.props.onTabClick) {
      this.props.onTabClick(activeKey);
    }
    this.setActiveKey(activeKey);
  }

  /**
   * 设置选中面板的 key
   */
  setActiveKey = (activeKey) => {
    if (this.state.activeKey !== activeKey) {
      this.setActiveIndex(activeKey);

      this.setState({
        activeKey,
      });
    }
  }

  /**
   * 设置选中面板的 index
   */
  setActiveIndex = (activeKey) => {
    const { children, onChange } = this.props;
    const activeIndex = children.findIndex((tabPane) => {
      return tabPane.key === activeKey;
    });

    // 触发 onChange 事件, 
    if (onChange) {
      onChange(activeKey);
    }

    this.setState({
      activeIndex,
    });
  }

  /**
   * 获取 InkBar 宽度
   */
  getTabsInkBarWidth = () => {
    const { children } = this.props;
    const wrapperWidth = this.getWrapperSize().width;
    const tabsInkBarWidth = wrapperWidth / children.length;

    this.setState({
      tabsInkBarWidth,
    });
  }

  /**
   * 获取 tabs 内容移动的位移样式
   */
  getTabsContentTransform = () => {
    const { activeIndex, slide } = this.state;
    const currentActiveIndex = activeIndex + 1;
    const translateX = -(((currentActiveIndex * 100) - 100) + slide.movePercent);
    return `translateX(${translateX}%) translateZ(0px)`;
  }

  /**
   * 获取 tabs 内容面板的样式
   */
  getTabsContentStyle = () => {
    const { animated } = this.props;
    const { slide } = this.state;
    if (animated) {
      return {
        WebkitTransform: this.getTabsContentTransform(),
        WebkitTransition: Math.abs(slide.distanceX) > 0 ? 'none' : '',
      };
    }
    return {};
  }

  /**
   * 通过选中面板的 index 获取对应的 key
   */
  getActiveKeyByIndex = (index) => {
    return this.props.children[index].key;
  }

  /**
   * 获取即将切换的面板 index 
   */
  getNextActiveIndex = (activeIndex) => {
    const direction = this.state.slide.distanceX > 0 ? 1 : -1;
    const maxIndex = this.props.children.length - 1;
    let nextActiveIndex = activeIndex + direction;

    if (nextActiveIndex < 0) {
      nextActiveIndex = 0;
    } else if (nextActiveIndex >= maxIndex) {
      nextActiveIndex = maxIndex;
    }
    return nextActiveIndex;
  }

  /**
   * 获取外层容器的宽度/高度
   * @memberof Tabs
   */
  getWrapperSize = () => {
    const $tabsElement = this.tabsElement;
    return {
      width: $tabsElement.clientWidth,
      height: $tabsElement.clientHeight,
    };
  }

  /**
   * 按下事件触发的函数
   */
  startSlide = (ev) => {
    // 不可以滑动 tab 内容进行切换
    if (!this.props.swipeable) {
      return;
    }
    const touch = ev.changedTouches ? ev.changedTouches[0] : ev;
    const { slide } = this.state;
    slide.isStartDrag = true;
    slide.startTime = new Date();
    slide.startX = touch.clientX;

    this.setState({
      slide,
    });
  }

  /**
   * 滑屏事件触发的函数
   */
  moveSlide = (ev) => {
    const touch = ev.changedTouches ? ev.changedTouches[0] : ev;
    const { slide } = this.state;
    // 未按下
    if (!slide.isStartDrag) {
      return;
    }
    const wrapperWidth = this.getWrapperSize().width;
    slide.distanceX = slide.startX - touch.clientX;
    slide.movePercent = (slide.distanceX / wrapperWidth) * 100;

    // 滑动了一定距离, 阻止默认行为, 解决某些浏览器的滑屏后退前进
    if (Math.abs(slide.distanceX) >= wrapperWidth / 20) {
      ev.preventDefault();
    }

    this.setState({
      slide,
    });
  }

  /**
   * 抬起/结束事件触发的函数
   */
  endSlide = () => {
    const { slide, activeIndex } = this.state;
    const endTime = new Date();

    // 滑动的绝对距离
    const moveDistance = Math.abs(slide.distanceX);
    // 外层容器的宽度
    const wrapperWidth = this.getWrapperSize().width;
    // 是否符合时间差
    const isMatchTime = endTime - slide.startTime < 300;
    // 滑动距离超过 1/4  or 滑动距离超过 1/5 且按下与抬起的时间差小于 300 毫秒
    if (moveDistance >= wrapperWidth / 4 || (moveDistance >= wrapperWidth / 8 && isMatchTime)) {
      const nextActiveIndex = this.getNextActiveIndex(activeIndex);

      if (nextActiveIndex !== activeIndex) {
        this.setState({
          activeIndex: nextActiveIndex,
        });

        if (this.props.onChange) {
          const activeKey = this.getActiveKeyByIndex(nextActiveIndex);
          this.props.onChange(activeKey);
        }
      }
    }

    // 重置
    this.setState({
      slide: {
        isStartDrag: false,
        startTime: 0,
        startX: 0,
        distanceX: 0,
        movePercent: 0,
      },
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
          active={tabItem.key === children[activeIndex].key}
          onTabClick={(key) => { this.onTabClick(key); }}
        />
      );
    });

    const tabsPanesContent = children.map((PaneItem) => {
      const isActive = PaneItem.key === activeKey;
      return (
        <TabPane
          key={PaneItem.key}
          active={isActive}
          {...PaneItem.props}
        >
          {PaneItem.props.children}
        </TabPane>
      );
    });

    const tabsContentClassName = animated ? 'tabs__content tabs__content--animated' : 'tabs__content tabs__content--no--animated';
    const tabsContentStyle = this.getTabsContentStyle();

    // 事件列表
    const tabsContentEvents = animated ? {
      onTouchStart: this.startSlide,
      onTouchMove: this.moveSlide,
      onTouchEnd: this.endSlide,
      onMouseDown: this.startSlide,
      onMouseMove: this.moveSlide,
      onMouseUp: this.endSlide,
    } : {};

    return (
      <div
        className="tabs"
        ref={(ele) => { this.tabsElement = ele; }}
      >
        <div className="tabs__handle">
          <InkBar
            animated={animated}
            activeIndex={activeIndex}
            tabsInkBarWidth={tabsInkBarWidth}
          />
          {tabsListsContent}
        </div>
        <div
          className={tabsContentClassName}
          ref={(ele) => { this.tabsContentElement = ele; }}
          style={tabsContentStyle}
          {...tabsContentEvents}
        >
          {tabsPanesContent}
        </div>
      </div>
    );
  }
}
