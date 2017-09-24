/**
 * https://github.com/jasonslyvia/react-marquee
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Marquee extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    children: PropTypes.any,
    // 是否循环滚动
    loop: PropTypes.bool,
    // 鼠标划过是否停止滚动
    hoverToStop: PropTypes.bool,
    leading: PropTypes.number,
    // 循环滚动模式, 下一次开始滚动的延迟时间
    trailing: PropTypes.number,
    // 帧率
    fps: PropTypes.number,
  }

  static defaultProps = {
    prefixClassName: 'marquee',
    loop: false,
    hoverToStop: false,
    leading: 500,
    trailing: 800,
    fps: 40,
  }

  state = {
    animatedWidth: 0, // 移动的宽度
    overflowWidth: 0, // 内容超出的宽度
  };

  componentDidMount() {
    this._measureText();
    this._startAnimation();
  }

  componentDidUpdate() {
    this._measureText();
    if (!this._marqueeTimer) {
      this._startAnimation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._marqueeTimer);
  }

  /**
   * 开始运动
   */
  _startAnimation() {
    // 清除之前的定时器
    if (this._marqueeTimer) {
      clearTimeout(this._marqueeTimer);
    }

    const fps = this.props.fps;
    const STEP = 1;
    const TIMEOUT = (1 / fps) * 1000;
    const isLeading = this.state.animatedWidth === 0;
    // const timeout = TIMEOUT;
    const timeout = isLeading ? this.props.leading : TIMEOUT;

    // 滚动
    const animate = () => {
      const { loop, trailing } = this.props;
      const { overflowWidth } = this.state;
      // 即将滚动的位置
      const animatedWidth = this.state.animatedWidth + STEP;
      // 是否滚动完
      const isRoundOver = animatedWidth > overflowWidth;

      if (isRoundOver) {
        // 不是循环滚动
        if (!loop) {
          return;
        }
      }

      if (isRoundOver && trailing) {
        // 滚动完后, 延迟开始下一次滚动
        this._marqueeTimer = setTimeout(() => {
          // 置重滚动位为 0
          this.setState({
            animatedWidth: 0,
          });

          this._marqueeTimer = setTimeout(animate, TIMEOUT);
        }, trailing);
      } else {
        // 未滚动完
        this.setState({
          animatedWidth,
        });

        this._marqueeTimer = setTimeout(animate, TIMEOUT);
      }
    };

    if (this.state.overflowWidth !== 0) {
      this._marqueeTimer = setTimeout(animate, timeout);
    }
  }

  /**
   * 获取 文案的尺寸信息
   */
  _measureText() {
    const container = this.wrapperRef;
    const node = this.textRef;

    if (container && node) {
      const containerWidth = container.offsetWidth;
      const textWidth = node.offsetWidth;
      // 内容文案超出的宽度
      const overflowWidth = textWidth - containerWidth;

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({
          overflowWidth,
        });
      }
    }
  }

  handleMouseEnter() {
    if (!this.props.hoverToStop) {
      return;
    }

    clearTimeout(this._marqueeTimer);
  }

  handleMouseLeave() {
    if (!this.props.hoverToStop) {
      return;
    }

    if (this.state.overflowWidth > 0) {
      this._startAnimation();
    } else {
      clearTimeout(this._marqueeTimer);
      this.setState({
        animatedWidth: 0,
      });
    }
  }

  render() {
    const { prefixClassName, className, children } = this.props;

    const marqueeClasses = classNames(
      prefixClassName,
      className,
    );

    const style = {
      position: 'relative',
      right: this.state.animatedWidth,
      whiteSpace: 'nowrap',
      display: 'inline-block',
    };

    return (
      <div
        className={marqueeClasses}
        style={{ overflow: 'hidden' }}
        role="marquee"
        ref={(ele) => { this.wrapperRef = ele; }}
        onMouseEnter={() => { this.handleMouseEnter(); }}
        onMouseLeave={() => { this.handleMouseLeave(); }}
      >
        <div
          className={`${prefixClassName}__content`}
          style={style}
          ref={(ele) => { this.textRef = ele; }}
        >
          {children}
        </div>
      </div>
    );
  }
}
