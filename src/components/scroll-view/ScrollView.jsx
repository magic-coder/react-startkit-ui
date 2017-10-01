import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './scss';

export default class ScrollView extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    // 是否允许横向滚动
    scrollX: PropTypes.bool,
    // 是否允许纵向滚动
    scrollY: PropTypes.bool,
    // 竖向滚动条位置
    scrollTop: PropTypes.number,
    // 横向滚动条位置
    scrollLeft: PropTypes.number,
    // 距顶部/左边多少距离时触发
    thresholdUpper: PropTypes.number,
    // 距底部/右边多少距离时触发
    thresholdLower: PropTypes.number,
    // 滚动到顶部/左边时触发
    onScrollToUpper: PropTypes.func,
    // 滚动到底部/右边时触发
    onScrollToLower: PropTypes.func,
    // 滚动时触发
    onScroll: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'scrollview',
    scrollX: false,
    scrollY: false,
    scrollTop: 0,
    scrollLeft: 0,
    thresholdUpper: 10,
    thresholdLower: 10,
  }

  componentDidMount() {
    const { scrollLeft, scrollTop } = this.props;

    if (scrollLeft !== 0 || scrollTop !== 0) {
      this.scrollTo(scrollLeft, scrollTop);
    }
  }

  componentWillReceiveProps(nextProps) {
    const hasMoveLeft = nextProps.scrollLeft !== this.props.scrollLeft;
    const hasMoveTop = nextProps.scrollTop !== this.props.scrollTop;

    if (hasMoveTop || hasMoveLeft) {
      this.scrollTo(nextProps.scrollLeft, nextProps.scrollTop);
    }
  }

  scrollTo(left, top) {
    const dpr = document.querySelector('html').getAttribute('data-dpr') || 1;
    this.view.scrollTo(left * dpr, top * dpr);
  }

  handleScroll = () => {
    const {
      scrollX, scrollY, thresholdUpper, thresholdLower,
      onScrollToUpper, onScrollToLower, onScroll,
    } = this.props;
    const dpr = document.querySelector('html').getAttribute('data-dpr') || 1;

    // 可视区域宽度、高度
    const clientWidth = this.view.clientWidth;
    const clientHeight = this.view.clientHeight;
    // 滚动条滚动高度 y、x
    const scrollTop = this.view.scrollTop;
    const scrollLeft = this.view.scrollLeft;
    // 滚动内容宽度、高度
    const scrollWidth = this.view.scrollWidth;
    const scrollHeight = this.view.scrollHeight;

    if (onScroll) {
      const detail = {
        scrollLeft,
        scrollTop,
        scrollHeight,
        scrollWidth,
        clientWidth,
        clientHeight,
      };
      onScroll(detail);
    }

    // 水平方向滚动
    if (scrollX) {
      if (scrollLeft <= thresholdUpper * dpr) {
        if (onScrollToUpper) {
          onScrollToUpper();
        }
      }

      if (scrollLeft >= scrollWidth - clientWidth - (thresholdLower * dpr)) {
        if (onScrollToUpper) {
          onScrollToLower();
        }
      }
    }

    // 垂直方向滚动
    if (scrollY) {
      if (scrollTop <= thresholdUpper * dpr) {
        if (onScrollToUpper) {
          onScrollToUpper();
        }
      }
      if (scrollTop >= scrollHeight - clientHeight - (thresholdLower * dpr)) {
        if (onScrollToUpper) {
          onScrollToLower();
        }
      }
    }
  }

  render() {
    const {
      prefixClassName, className, style, children,
      scrollX, scrollY,
    } = this.props;

    const viewClasses = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--x`]: scrollX,
        [`${prefixClassName}--y`]: scrollY,
      },
    );

    return (
      <div
        className={viewClasses}
        style={style}
        ref={(ele) => { this.view = ele; }}
        onScroll={() => { this.handleScroll(); }}
      >
        {children}
      </div>
    );
  }
}
