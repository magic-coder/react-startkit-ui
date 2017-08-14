import React from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import InkBar from './InkBar';
import ScrollableTabBar from './ScrollableTabBar';
import TabPane from './TabPane';

import './scss/tabs';

export default class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    defaultActiveKey: PropTypes.string, // 初始化选中面板的 key
    animated: PropTypes.bool, // 是否动画
    swipeable: PropTypes.bool, // 是否可以滑动 tab 内容进行切换
    pageSize: PropTypes.number, // 可视区显示的 tab 数量，可以看做一页
    onTabClick: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    animated: false,
    swipeable: true,
    pageSize: 4,
    onTabClick: () => {},
    onChange: () => {},
  }

  constructor(props) {
    super(props);

    const activeKey = this.getDefaultActiveKey(props, this.props.defaultActiveKey);

    this.state = {
      tabsInkBarWidth: 0,
      activeKey,
      activeIndex: 0,
      slide: {
        isStartDrag: false,
        startTime: 0,
        startX: 0,
        startY: 0,
        distanceX: 0,
        distanceY: 0,
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
    const { children, pageSize } = this.props;
    const wrapperWidth = this.getWrapperSize().width;
    // 一屏的 tab 个数
    const size = children.length > pageSize ? pageSize : children.length;
    const tabsInkBarWidth = wrapperWidth / size;

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
   * 获取默认选中面板的 key
   * @param {*} props 
  */
  getDefaultActiveKey = (props, defaultActiveKey) => {
    let activeKey;
    if ('defaultActiveKey' in props) {
      // 有设置默认选中面板的 key
      const defaultActiveChild = props.children.find((child) => {
        return child.key === defaultActiveKey;
      });
      if (defaultActiveChild && !defaultActiveChild.props.disabled) {
        activeKey = defaultActiveKey;
      } else {
        activeKey = this.getFirstActiveKey();
      }
    } else {
      activeKey = this.getFirstActiveKey();
    }
    return activeKey;
  };

  /**
   * 获取第一项不禁用面包的 key
   */
  getFirstActiveKey = () => {
    const firstActiveChild = this.props.children.find((child) => {
      return child && !child.props.disabled;
    });
    return firstActiveChild.key;
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
    slide.startY = touch.clientY;

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
    slide.distanceY = slide.startY - touch.clientY;
    if (Math.abs(slide.distanceY) < 30) {
      slide.movePercent = (slide.distanceX / wrapperWidth) * 100;
    }

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
    const moveDistanceX = Math.abs(slide.distanceX);
    const moveDistanceY = Math.abs(slide.distanceY);
    // 外层容器的宽度
    const wrapperWidth = this.getWrapperSize().width;
    // 是否有垂直滑动距离
    const hasMoveDistanceY = moveDistanceY > 120;

    // 条件: 垂直滑动距离小于 30 且水平滑动距离超过 1/4
    const isMatchDistance = !hasMoveDistanceY && moveDistanceX >= wrapperWidth / 4;

    // 是否符合时间差
    const isMatchTime = endTime - slide.startTime < 300;
    // 最小滑动距离
    const isMatchMoveDistanceXMin = moveDistanceX >= wrapperWidth / 8;
    // 条件: 垂直滑动距离小于 30 且 滑动距离超过 1/8 且按下与抬起的时间差小于 300 毫秒
    const isMatchDistanceAndTime = !hasMoveDistanceY && isMatchTime && isMatchMoveDistanceXMin;

    if (isMatchDistance || isMatchDistanceAndTime) {
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
        startY: 0,
        distanceX: 0,
        distanceY: 0,
        movePercent: 0,
      },
    });
  }

  // 渲染 tabInkBar
  renderTabInkBar = () => {
    const { animated } = this.props;
    const { tabsInkBarWidth, activeIndex } = this.state;

    return (
      <InkBar
        animated={animated}
        activeIndex={activeIndex}
        tabsInkBarWidth={tabsInkBarWidth}
      />
    );
  }

  // 渲染 tabBar
  renderTabBar = () => {
    const { children, pageSize } = this.props;
    const { activeIndex } = this.state;

    const tabInkBar = this.renderTabInkBar();
    const tabBarLists = children.map((tabItem) => {
      return (
        <Tab
          key={tabItem.key}
          {...tabItem.props}
          tabKey={tabItem.key}
          active={tabItem.key === children[activeIndex].key}
          onTabClick={(key) => { this.onTabClick(key); }}
          pageSize={pageSize}
          count={children.length}
        />
      );
    });

    // 超出一屏显示
    if (children.length > pageSize) {
      return (
        <div className="tabs__bar">
          <ScrollableTabBar
            activeIndex={activeIndex}
            pageSize={pageSize}
            count={children.length}
          >
            {tabInkBar}
            {tabBarLists}
          </ScrollableTabBar>
        </div>
      );
    }

    // 未超出一屏显示
    return (
      <div className="tabs__bar">
        {tabInkBar}
        {tabBarLists}
      </div>
    );
  }

  render() {
    const { children, animated } = this.props;
    const { activeIndex } = this.state;

    const tabBarContet = this.renderTabBar();
    const tabsPanesContent = children.map((PaneItem) => {
      const paneItemChildContent = PaneItem.props.children;
      return (
        <TabPane
          key={PaneItem.key}
          active={PaneItem.key === children[activeIndex].key}
        >
          {paneItemChildContent}
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
        {tabBarContet}
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
