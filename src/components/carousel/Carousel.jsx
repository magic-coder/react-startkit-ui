import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import addEventListener from '@/utils/Dom/addEventListener';

import './scss';

export default class Carousel extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    // 当前显示的索引
    selectedIndex: PropTypes.number,
    // 方向
    direction: PropTypes.oneOf([
      'vertical', 'horizontal',
    ]),
    // 是否循环播放
    infinite: PropTypes.bool,
    // 是否自动播放
    autoplay: PropTypes.bool,
    // 是否渲染页码导航
    pagination: PropTypes.bool,
    // 滑动速度, 即 slider 自动滑动开始到结束的时间 (单位ms)
    speed: PropTypes.number,
    // 自动播放的间停时间 (单位ms)
    intervalTime: PropTypes.number,
    // 切换后的回调函数
    onAfterChange: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'carousel',
    selectedIndex: 0,
    direction: 'horizontal',
    infinite: false,
    autoplay: false,
    pagination: true,
    speed: 300,
    intervalTime: 3500,
  }

  constructor(props) {
    super(props);

    let slidesArr = props.children;
    let selectedIndex = props.selectedIndex;
    let slidesLeng = slidesArr.length;
    // 循环播放
    if (props.infinite) {
      slidesArr = [props.children[slidesLeng - 1], ...slidesArr, props.children[0]];
      slidesLeng = slidesArr.length;
      selectedIndex += 1;
    }

    // 当前显示的 index 索引
    this.selectedIndex = selectedIndex;
    this.autoPlaytimer = null;

    this.state = {
      slidesArr,
      slideStyle: {},
      slide: {
        isStartDrag: false,
        startTime: new Date(),
        startX: 0,
        startY: 0,
      },
    };
  }

  componentDidMount() {
    this.initSlide();
    // 监听 window resize 事件
    this.resizeHandler = addEventListener(window, 'resize', () => {
      console.log('监听 window resize 事件');
      this.initSlide();
    });
  }

  componentWillUnmount() {
    clearInterval(this.autoPlaytimer);
    // 移除事件监听
    if (this.resizeHandler) {
      this.resizeHandler.remove();
      this.resizeHandler = null;
    }
  }

  /**
   * 初始化组件
   */
  initSlide() {
    const { selectedIndex } = this;
    const { direction, autoplay } = this.props;
    const wrapperWidth = this.wrapperRef.offsetWidth;
    const wrapperHeight = this.wrapperRef.offsetHeight;

    if (selectedIndex > 0) {
      const defaultMoveDistance = direction === 'vertical' ? wrapperHeight : wrapperWidth;
      this.moveTo(selectedIndex, defaultMoveDistance, 0);
    }

    if (autoplay) {
      this.autoplay();
    }
  }

  /**
   * 按下事件
   */
  startSlide = (ev) => {
    const touch = ev.changedTouches ? ev.changedTouches[0] : ev;
    const { slide } = this.state;

    // 清楚自动播放的定时器
    clearInterval(this.autoPlaytimer);

    slide.isStartDrag = true;
    slide.startTime = new Date();
    slide.startX = touch.clientX;
    slide.startY = touch.clientY;

    this.setState({
      slide,
    });
  }

  moveSlide = (ev) => {
    ev.preventDefault();
    const touch = ev.changedTouches ? ev.changedTouches[0] : ev;
    const { direction, infinite } = this.props;
    const { slide, slidesArr } = this.state;
    const { selectedIndex } = this;

    if (!slide.isStartDrag) {
      return;
    }

    // 是循环轮播. 重置最后一张 和 第一张
    let willSelectedIndex = selectedIndex;
    if (infinite) {
      if (willSelectedIndex === 0) {
        willSelectedIndex = slidesArr.length - 2;
      } else if (willSelectedIndex === slidesArr.length - 1) {
        willSelectedIndex = 1;
      }
    }

    const wrapperWidth = this.wrapperRef.offsetWidth;
    const wrapperHeight = this.wrapperRef.offsetHeight;
    const distanceX = touch.clientX - slide.startX - (willSelectedIndex * wrapperWidth);
    const distanceY = touch.clientY - slide.startY - (willSelectedIndex * wrapperHeight);

    if (direction === 'horizontal') {
      this.transform(distanceX, 0, 0);
    } else if (direction === 'vertical') {
      this.transform(0, distanceY, 0);
    }
  }

  endSlide = (ev) => {
    const touch = ev.changedTouches ? ev.changedTouches[0] : ev;
    const { direction, autoplay } = this.props;
    const { slide } = this.state;
    const endTime = new Date();

    const distanceX = touch.clientX - slide.startX;
    const distanceY = touch.clientY - slide.startY;
    const wrapperWidth = this.wrapperRef.offsetWidth;
    const wrapperHeight = this.wrapperRef.offsetHeight;

    // 滑动的绝对距离. 水平、垂直方向
    const moveDistanceX = Math.abs(distanceX);
    const moveDistanceY = Math.abs(distanceY);
    // 是否符合时间差
    const isMatchTime = endTime - slide.startTime < 300;

    // 水平方向
    // ----------------------------
    if (direction === 'horizontal') {
      // 是否滑动最小距离
      const isMatchMoveDistanceXMin = moveDistanceX >= wrapperWidth / 8;
      // 条件: 垂直滑动距离小于 30 且 滑动距离超过 1/8 且按下与抬起的时间差小于 300 毫秒
      const isMatchDistanceAndTime = isMatchTime && isMatchMoveDistanceXMin;
      // 条件: 垂直滑动距离小于 30 且水平滑动距离超过 1/4
      const isMatchDistance = moveDistanceX >= wrapperWidth / 4;

      if (isMatchDistance || isMatchDistanceAndTime) {
        if (distanceX < 0) {
          this.next();
        } else if (distanceX > 0) {
          this.prev();
        }
      } else {
        this.transtionTo(this.selectedIndex);
      }
    }

    // 垂直方向
    // ----------------------------
    if (direction === 'vertical') {
      // 是否滑动最小距离
      const isMatchMoveDistanceYMin = moveDistanceY >= wrapperWidth / 8;
      // 条件: 垂直滑动距离小于 30 且 滑动距离超过 1/8 且按下与抬起的时间差小于 300 毫秒
      const isMatchDistanceAndTime = isMatchTime && isMatchMoveDistanceYMin;
      // 条件: 垂直滑动距离小于 30 且水平滑动距离超过 1/4
      const isMatchDistanceY = moveDistanceY >= wrapperHeight / 6;

      if (isMatchDistanceY || isMatchDistanceAndTime) {
        if (distanceY < 0) {
          this.next();
        } else if (distanceY > 0) {
          this.prev();
        }
      } else {
        this.transtionTo(this.selectedIndex);
      }
    }

    if (autoplay) {
      this.autoplay();
    }

    this.setState({
      slide: {
        isStartDrag: false,
        startX: 0,
        startY: 0,
      },
    });
  }

  prev() {
    const { selectedIndex } = this;
    const { infinite } = this.props;

    let willSelectedIndex = selectedIndex - 1;
    if (willSelectedIndex < 0) {
      willSelectedIndex = !infinite ? 0 : this.state.slidesArr.length - 3;
    }

    this.transtionTo(willSelectedIndex);
  }

  next() {
    const { selectedIndex } = this;
    const { infinite } = this.props;

    let willSelectedIndex = selectedIndex + 1;
    if (willSelectedIndex > this.state.slidesArr.length - 1) {
      willSelectedIndex = infinite ? 2 : this.state.slidesArr.length - 1;
    }

    this.transtionTo(willSelectedIndex);
  }

  autoplay() {
    clearInterval(this.autoPlaytimer);
    this.autoPlaytimer = setInterval(() => {
      this.next();
    }, this.props.intervalTime);
  }

  /**
   * 页码切换轮播图
   * @param {*} index 
   */
  handlePagination(index) {
    const { infinite, autoplay } = this.props;
    clearInterval(this.autoPlaytimer);

    let willSelectedIndex = index;
    if (infinite) {
      willSelectedIndex += 1;
    }
    this.transtionTo(willSelectedIndex);

    if (autoplay) {
      this.autoplay();
    }
  }

  /**
   * 动画方式切换到指定 index
   * @param {*} index 
   */
  transtionTo(index) {
    const wrapperWidth = this.wrapperRef.offsetWidth;
    const wrapperHeight = this.wrapperRef.offsetHeight;
    const moveDistance = this.props.direction === 'vertical' ? wrapperHeight : wrapperWidth;

    this.selectedIndex = index;
    this.moveTo(index, moveDistance, this.props.speed);
  }

  /**
   * 切换到指定位置
   * @param {*} index 序号
   * @param {*} moveDistance 移动到的目的位置
   * @param {*} duration 完成动画的时间
   */
  moveTo(index, moveDistance, duration) {
    const { direction } = this.props;
    const targetPos = -(index * moveDistance);

    if (direction === 'horizontal') {
      this.transform(targetPos, 0, duration);
    } else if (direction === 'vertical') {
      this.transform(0, targetPos, duration);
    }
  }

  /**
   * 运动
   * @param {*} x 
   * @param {*} y 
   * @param {*} duration 
   */
  transform(x, y, duration) {
    const { onAfterChange } = this.props;
    this.setState({
      slideStyle: {
        transform: `translate3d(${x}px, ${y}px, 0px)`,
        transitionDuration: `${duration}ms`,
      },
    });

    if (onAfterChange && duration > 0) {
      onAfterChange();
    }
  }

  /**
   * 页码导航
   */
  renderPagination() {
    const { prefixClassName, infinite } = this.props;
    const { slidesArr } = this.state;
    const { selectedIndex } = this;

    let pageArr = slidesArr;
    let pageCurrent = infinite ? selectedIndex - 1 : selectedIndex;

    // 是循环模式.
    // 页码减去clone的前后两项; 当前页码是最后一项时, 重置 0;
    if (infinite) {
      pageArr = pageArr.filter((page, index) => {
        return index !== 0 && index !== pageArr.length - 1;
      });
      if (pageCurrent >= pageArr.length) {
        pageCurrent = 0;
      }
    }

    return (
      <div className={`${prefixClassName}__pagination`}>
        {
          pageArr.map((page, index) => {
            const key = `pagination-${index}`;
            return (
              <span
                className={index === pageCurrent ? 'active' : ''}
                onClick={() => { this.handlePagination(index); }}
                key={key}
                role="button"
                tabIndex="0"
              >
                <em>{index + 1}</em>
              </span>
            );
          })
        }
      </div>
    );
  }

  render() {
    const {
      prefixClassName, className, style, direction, pagination,
    } = this.props;
    const { slidesArr, slideStyle } = this.state;

    const carouselClassed = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--${direction}`]: direction,
      },
    );

    // 事件列表
    const moveEvents = {
      onTouchStart: this.startSlide,
      onTouchMove: this.moveSlide,
      onTouchEnd: this.endSlide,
      onMouseDown: this.startSlide,
      onMouseMove: this.moveSlide,
      onMouseUp: this.endSlide,
    };

    return (
      <div
        className={carouselClassed}
        style={style}
        ref={(ele) => { this.carouselRef = ele; }}
      >
        <div
          className={`${prefixClassName}__wrapper`}
          style={slideStyle}
          ref={(ele) => { this.wrapperRef = ele; }}
          {...moveEvents}
        >
          {
            slidesArr.map((item, index) => {
              const key = `carousel-${index}`;
              return (
                React.cloneElement(item, { key })
              );
            })
          }
        </div>
        {
          !pagination ? null : this.renderPagination()
        }
      </div>
    );
  }
}
