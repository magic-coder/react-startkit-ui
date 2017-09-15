import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';

import './scss';

export default class Badge extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    // 自定义 className
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    // 样式
    style: PropTypes.object,
    // 子元素
    children: PropTypes.any,
    // 展示的数字 或者 文案
    text: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    // 展示封顶的数字值
    overflowCount: PropTypes.number,
    // 当数值为 0 时，是否展示 Badge
    showZero: PropTypes.bool,
    // 不展示数字，只有一个小红点
    dot: PropTypes.bool,
  }

  static defaultProps = {
    prefixClassName: 'badge',
    overflowCount: 99,
    dot: false,
  }

  renderBadgeSup = () => {
    const { prefixClassName, style, text, overflowCount, showZero, dot } = this.props;

    // 显示的数字或者文案. 不是数字, 显示文案; 否则, 显示显示文案 或者 空
    let displayText = typeof text === 'number' && text > overflowCount ? `${overflowCount}+` : text;
    const isDot = dot;
    // 小红点不显示数字或者文案
    if (isDot) {
      displayText = '';
    }

    const isZero = displayText === '0' || displayText === 0;
    const isEmpty = displayText === null || displayText === undefined || displayText === '';

    // 隐藏不显示
    const hidden = (isEmpty || (isZero && !showZero)) && !isDot;

    const supClasses = classNames({
      [`${prefixClassName}__dot`]: isDot,
      [`${prefixClassName}__text`]: !isDot,
    });

    return hidden ? null : (
      <sup className={supClasses} data-show={!hidden} style={style}>{displayText}</sup>
    );
  }

  render() {
    const { prefixClassName, className, children, dot } = this.props;

    const classes = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--not-wrapper`]: !children,
      },
    );

    return (
      <span className={classes}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={children && dot ? `${prefixClassName}--zoom` : ''}
          transitionAppear
        >
          {this.renderBadgeSup()}
        </Animate>
      </span>
    );
  }
}
