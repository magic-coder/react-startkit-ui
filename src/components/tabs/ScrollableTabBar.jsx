import React from 'react';
import PropTypes from 'prop-types';

export default class ScrollableTabBar extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    activeIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }

  static defaultProps = {
    children: null,
    activeIndex: 0,
    pageSize: 4,
    count: 0,
  }

  constructor(props) {
    super(props);

    this.state = {
      isInitSwipe: true,
      swipe: {
        isStartDrag: false,
        startTime: 0,
        startX: 0,
        distanceX: 0,
        translateX: 0,
      },
    };
  }

  componentDidMount() {
    // this.setTranslate(this.props.activeIndex + 1);
  }

  componentWillReceiveProps(nextProps) {
    this.setTranslate(nextProps.activeIndex + 1);
  }

  /**
   * 设置滚动的位移
   */
  setTranslate = (activeIndex) => {
    const { swipe } = this.state;
    const { pageSize, count } = this.props;
    // 外层容器宽度
    const wrapperWidth = this.getWrapperSize().width;
    // 每项 tab 的宽度
    const tabItemWidth = wrapperWidth / pageSize;
    // 滑动距离
    const distanceX = this.state ? this.state.swipe.distanceX : 0;
    // 半屏数量
    const halfPageSize = Math.floor(pageSize / 2);
    // 位移
    let translateX;
    if (activeIndex <= halfPageSize) {
      // 前面几项, 不做滚动位移. 位移 = 滑动的距离/0
      translateX = -distanceX;
    } else if (activeIndex <= count - halfPageSize) {
      // 中间项. 位移 = 每项宽度 * (当前选中的 index - 半屏数 - 1) + 滑动的距离
      translateX = -((tabItemWidth * (activeIndex - halfPageSize - 1)) + distanceX);
    } else {
      // 最后几项. 位移 = 最大可滚动的位移 + 滑动的距离
      translateX = -((tabItemWidth * (count - pageSize)) + distanceX);
    }

    swipe.translateX = translateX;
    this.setState({
      swipe,
    }, () => {
      // 延迟设置不是初始化滑动
      if (this.state.isInitSwipe) {
        setTimeout(() => {
          this.setState({
            isInitSwipe: false,
          });
        }, 200);
      }
    });
  }

  /**
   * 获取外层容器的宽度/高度
   */
  getWrapperSize = () => {
    const $tabsBarContainerElement = this.tabsBarContainerElement;
    return {
      width: !$tabsBarContainerElement ? 0 : $tabsBarContainerElement.clientWidth,
      height: !$tabsBarContainerElement ? 0 : $tabsBarContainerElement.clientHeight,
    };
  }

  /**
   * 获取 swipe 内容的样式
   */
  getSwipeStyle = () => {
    const { swipe, isInitSwipe } = this.state;
    // 按下且有滑动距离时, 不执行运动
    const hasMoveDistance = Math.abs(swipe.distanceX) > 20;
    return {
      WebkitTransform: this.getSwipeTransform(),
      WebkitTransition: isInitSwipe || (swipe.isStartDrag && hasMoveDistance) ? 'none' : '',
    };
  }

  /**
   * 获取 swipe 内容移动的位移样式
   */
  getSwipeTransform = () => {
    const { swipe } = this.state;
    const translateX = swipe.translateX - swipe.distanceX;
    return `translateX(${translateX}px) translateZ(0px)`;
  }

  /**
   * 获取位移的界限/最小最大值
   */
  getSwipeTranslateLimit = () => {
    const { pageSize, count } = this.props;
    const wrapperWidth = this.getWrapperSize().width;
    const tabItemWidth = wrapperWidth / pageSize;
    const minTranslateX = 0;
    const maxTranslateX = -(tabItemWidth * (count - pageSize));
    const minTranslateY = 0;
    const maxTranslateY = 0;

    return {
      minTranslateX,
      maxTranslateX,
      minTranslateY,
      maxTranslateY,
    };
  }

  /**
   * 按下事件触发的函数
   */
  startSwipe = (ev) => {
    const touch = ev.changedTouches ? ev.changedTouches[0] : ev;
    const { swipe } = this.state;
    swipe.isStartDrag = true;
    swipe.startTime = new Date();
    swipe.startX = touch.clientX;

    this.setState({
      swipe,
    });
  }

  /**
   * 滑屏事件触发的函数
   */
  moveSwipe = (ev) => {
    const touch = ev.changedTouches ? ev.changedTouches[0] : ev;
    const { swipe } = this.state;
    // 未按下
    if (!swipe.isStartDrag) {
      return;
    }

    const wrapperWidth = this.getWrapperSize().width;
    swipe.distanceX = swipe.startX - touch.clientX;

    // 滑动了一定距离, 阻止默认行为, 解决某些浏览器的滑屏后退前进
    if (Math.abs(swipe.distanceX) >= wrapperWidth / 20) {
      ev.preventDefault();
    }

    this.setState({
      swipe,
    });
  }

  /**
   * 抬起/结束事件触发的函数
   */
  endSwipe = (ev) => {
    const { swipe } = this.state;
    const endTime = new Date();

    // 位置可允许的最小值, 最大值
    const minTranslateX = this.getSwipeTranslateLimit().minTranslateX;
    const maxTranslateX = this.getSwipeTranslateLimit().maxTranslateX;
    // 滑动的绝对距离
    const moveDistance = Math.abs(swipe.distanceX);
    // 外层容器的宽度
    const wrapperWidth = this.getWrapperSize().width;
    // 是否符合时间差
    const diffTime = endTime - swipe.startTime;
    // 滑动距离超过 1/8 且按下与抬起的时间差小于 200 毫秒
    let distanceX;
    if (diffTime < 200 && (moveDistance >= wrapperWidth / 8)) {
      distanceX = swipe.distanceX * (diffTime * ((moveDistance / wrapperWidth) / 3));
    } else {
      distanceX = swipe.distanceX;
    }

    if (diffTime > 200) {
      ev.preventDefault();
    }

    // 位移
    let translateX = swipe.translateX - distanceX;
    if (translateX > minTranslateX) {
      translateX = minTranslateX;
    } else if (translateX < maxTranslateX) {
      translateX = maxTranslateX;
    }

    // 重置
    this.setState({
      swipe: {
        isStartDrag: false,
        startTime: 0,
        startX: 0,
        distanceX: 0,
        translateX,
      },
    });
  }

  render() {
    const { children } = this.props;
    // 事件列表
    const swipeEvents = {
      onTouchStart: this.startSwipe,
      onTouchMove: this.moveSwipe,
      onTouchEnd: this.endSwipe,
      onMouseDown: this.startSwipe,
      onMouseMove: this.moveSwipe,
      onMouseUp: this.endSwipe,
    };
    const swipeStyle = this.getSwipeStyle();

    return (
      <div
        className="tabs__bar__container"
        ref={(ele) => { this.tabsBarContainerElement = ele; }}
      >
        <div
          className="tabs__bar__swipe"
          ref={(ele) => { this.swipeElement = ele; }}
          style={swipeStyle}
          {...swipeEvents}
        >
          <div className="tabs__bar__nav">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
