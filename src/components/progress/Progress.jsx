import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Circle } from 'rc-progress';
import Icon from '../icon';

import './scss';

const statusColorMap = {
  normal: '#108ee9',
  exception: '#f04134',
  success: '#00a854',
};

export default class Progress extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    // 类型. 线条, 圆环
    type: PropTypes.oneOf([
      'line', 'circle', 'dashboard',
    ]),
    // 状态
    status: PropTypes.oneOf([
      'normal', 'exception', 'active', 'success',
    ]),
    // 百分比
    percent: PropTypes.number,
    // 进度条线的宽度，单位 px. 默认值: 10;  圆形进度条线的宽度，单位是进度条画布宽度的百分比. 默认值: 6
    strokeWidth: PropTypes.number,
    // 圆形进度条画布宽度，单位 px
    width: PropTypes.number,
    // 是否显示进度数值或状态图标
    showInfo: PropTypes.bool,
    // 内容的模板函数
    format: PropTypes.func,
    trailColor: PropTypes.string,
    gapDegree: PropTypes.number,
    gapPosition: PropTypes.oneOf([
      'top', 'bottom', 'left', 'right',
    ]),
    // 动画出现. only line
    appearTransition: PropTypes.bool,
  }

  static defaultProps = {
    prefixClassName: 'progress',
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    appearTransition: false,
  }

  componentDidMount() {
    if (this.props.appearTransition) {
      setTimeout(() => {
        this.barRef.style.width = `${this.props.percent}%`;
      }, 10);
    }
  }

  componentWillReceiveProps() {
    this.noAppearTransition = true;
  }

  /**
   * 渲染 进度条
   * 
   * @param {any} progressInfo 
   * @memberof Progress
   */
  renderProgressLine(progressInfo) {
    const { prefixClassName, percent, strokeWidth, appearTransition } = this.props;

    // 进度样式
    const dpr = document.querySelector('html').getAttribute('data-dpr') || 1;
    const percentStyle = {
      width: this.noAppearTransition || !appearTransition ? `${percent}%` : 0,
      height: (strokeWidth || 8) * dpr,
    };

    return (
      <div className={`${prefixClassName}__container`}>
        <div
          className={`${prefixClassName}__outer`}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className={`${prefixClassName}__inner`}>
            <div
              className={`${prefixClassName}__bg`}
              ref={(ele) => { this.barRef = ele; }}
              style={percentStyle}
            />
          </div>
        </div>
        {progressInfo}
      </div>
    );
  }

  /**
   * 渲染 进度圈
   * 
   * @param {any} progressInfo 
   * @param {any} progressStatus 
   * @memberof Progress
   */
  renderProgressCircle(progressInfo, progressStatus) {
    const {
      prefixClassName, type, percent, strokeWidth, width,
      trailColor, gapDegree, gapPosition,
    } = this.props;

    const dpr = document.querySelector('html').getAttribute('data-dpr') || 1;
    const circleSize = (width || 132) * dpr;
    const circleStyle = {
      width: circleSize,
      height: circleSize,
      fontSize: (circleSize * 0.16) + 6,
    };
    const circleWidth = strokeWidth || 6;
    /* eslint-disable no-mixed-operators */
    const gapPos = gapPosition || (type === 'dashboard') && 'bottom' || 'top';
    const gapDeg = gapDegree || (type === 'dashboard') && 75;
    /* eslint-enable no-mixed-operators */

    return (
      <div className={`${prefixClassName}__inner`} style={circleStyle}>
        <Circle
          ref={(ele) => { this.barRef = ele; }}
          percent={percent}
          strokeWidth={circleWidth}
          trailWidth={circleWidth}
          strokeColor={statusColorMap[progressStatus]}
          trailColor={trailColor}
          prefixCls={prefixClassName}
          gapDegree={gapDeg}
          gapPosition={gapPos}
        />
        {progressInfo}
      </div>
    );
  }

  render() {
    const { prefixClassName, type, status, percent, width = 132, showInfo, format } = this.props;

    const progressStatus = parseInt(percent.toString(), 10) >= 100 && !('status' in this.props) ? 'success' : (status || 'normal');
    const progressClassed = classNames(
      prefixClassName,
      {
        [`${prefixClassName}--line`]: type === 'line',
        [`${prefixClassName}--circle`]: type === 'circle',
        [`${prefixClassName}--status-${progressStatus}`]: true,
      },
    );

    let progressInfo;
    // 进度信息
    const textFormatter = format || ((percentNumber) => {
      return `${percentNumber}%`;
    });

    if (showInfo) {
      let text;
      // icon 尺寸
      const dpr = document.querySelector('html').getAttribute('data-dpr') || 1;
      const iconSize = (width / 4) * dpr;
      const iconStyle = (type === 'circle' || type === 'dashboard') ? {
        width: iconSize,
        height: iconSize,
      } : {};
      // icon 类型. 是否使用填充
      const iconType = (type === 'circle' || type === 'dashboard') ? '' : '-circle';
      if (progressStatus === 'exception') {
        text = format ? textFormatter(percent) : <Icon style={iconStyle} type={`cross${iconType}`} />;
      } else if (progressStatus === 'success') {
        text = format ? textFormatter(percent) : <Icon style={iconStyle} type={`check${iconType}`} />;
      } else {
        text = textFormatter(percent);
      }
      progressInfo = <span className={`${prefixClassName}__text`}>{text}</span>;
    }

    let progress;
    if (type === 'line') {
      progress = this.renderProgressLine(progressInfo);
    } else if (type === 'circle') {
      progress = this.renderProgressCircle(progressInfo, progressStatus);
    }

    return (
      <div className={progressClassed}>
        {progress}
      </div>
    );
  }
}
