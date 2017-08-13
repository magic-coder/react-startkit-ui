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

    const translateX = this.getInitTranslateX();
    console.log('inti translateX =>>', translateX);
    this.state = {
      swipe: {
        isStartDrag: false,
        startTime: 0,
        startX: 0,
        distanceX: 0,
        translateX,
      },
    };
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
    const { swipe } = this.state;
    return {
      WebkitTransform: this.getSwipeTransform(),
      WebkitTransition: swipe.isStartDrag ? 'none' : '',
    };
  }

  /**
   * 获取初始化位移
   */
  getInitTranslateX = () => {
    const { activeIndex, pageSize, count } = this.props;
    const wrapperWidth = this.getWrapperSize().width;
    const tabItemWidth = wrapperWidth / pageSize;
    const distanceX = this.state ? this.state.swipe.distanceX : 0;
    let translateX;
    if (activeIndex < count - 1) {
      if (activeIndex >= Math.ceil(pageSize / 2)) {
        translateX = -((tabItemWidth * (activeIndex - 2)) + distanceX);
      } else {
        translateX = -distanceX;
      }
    } else {
      translateX = -((tabItemWidth * (count - pageSize)) + distanceX);
    }

    return translateX;
  }

  /**
   * 获取 swipe 内容移动的位移样式
   */
  getSwipeTransform = () => {
    // const { swipe } = this.state;
    // const { activeIndex, pageSize, count } = this.props;
    // const wrapperWidth = this.getWrapperSize().width;
    // const tabItemWidth = wrapperWidth / pageSize;
    // let translateX;
    // console.log(pageSize, count, activeIndex, activeIndex < count - 1);
    // if (activeIndex < count - 1) {
    //   if (activeIndex >= Math.ceil(pageSize / 2)) {
    //     translateX = -((tabItemWidth * (activeIndex - 2)) + swipe.distanceX);
    //   } else {
    //     console.log('滑动 =>>', swipe.distanceX);
    //     translateX = -(swipe.distanceX);
    //   }
    // } else {
    //   translateX = -((tabItemWidth * (count - pageSize)) + swipe.distanceX);
    // }

    // if (translateX > 0) {
    //   translateX = 0;
    // } else if (translateX < -tabItemWidth * (count - pageSize)) {
    //   translateX = -tabItemWidth * (count - pageSize);
    // }
    const translateX = this.getInitTranslateX();
    return `translateX(${translateX}px) translateZ(0px)`;
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

  moveSwipe = (ev) => {
    const touch = ev.changedTouches ? ev.changedTouches[0] : ev;
    const { swipe } = this.state;
    // 未按下
    if (!swipe.isStartDrag) {
      return;
    }

    const wrapperWidth = this.getWrapperSize().width;
    swipe.distanceX = swipe.startX - touch.clientX;
    swipe.translateX -= swipe.distanceX;

    // 滑动了一定距离, 阻止默认行为, 解决某些浏览器的滑屏后退前进
    if (Math.abs(swipe.distanceX) >= wrapperWidth / 20) {
      ev.preventDefault();
    }

    this.setState({
      swipe,
    });
  }

  endSwipe = () => {
    const { swipe } = this.state;
    const translateX = swipe.translateX;

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
