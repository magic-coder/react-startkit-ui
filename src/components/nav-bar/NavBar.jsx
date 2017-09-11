import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../icon';

import './scss';

export default class NavBar extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    // 自定义 className
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    // 样式
    style: PropTypes.object,
    children: PropTypes.any,
    // 导航模式
    mode: PropTypes.oneOf([
      'dark', 'light',
    ]),
    // 元素的宽度是否是自适应
    auto: PropTypes.bool,
    // 左边的 icon name (设置为 false/null 不渲染此图标)
    leftIconName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    // 左边内容
    leftContent: PropTypes.any,
    // 左边内容
    rightContent: PropTypes.any,
    // 是否有 loading 图标
    hasLoading: PropTypes.bool,
    // 导航左边点击回调
    onLeftClick: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'navbar',
    mode: 'dark',
    auto: false,
    hasLoading: false,
    leftIconName: 'left',
    leftContent: '返回',
    onLeftClick: () => {},
  }

  renderTitle = () => {
    const { prefixClassName, mode, hasLoading, children } = this.props;
    const loadingType = mode === 'dark' ? 'loading-light' : 'loading';
    return (
      <div className={`${prefixClassName}__title`}>
        <h1 className={`${prefixClassName}__title__content`}>{children}</h1>
        {hasLoading ? <div className={`${prefixClassName}__loading`}><Icon type={loadingType} size="xs" /></div> : null}
      </div>
    );
  }

  renderLeft = () => {
    const { prefixClassName, leftIconName, leftContent, onLeftClick } = this.props;
    return (
      <div
        className={`${prefixClassName}__left`}
        role="button"
        tabIndex="0"
        onClick={onLeftClick}
      >
        <span className={`${prefixClassName}__left__icon`}>
          {typeof leftIconName === 'string' ? <Icon type={leftIconName} /> : leftIconName }
        </span>
        { leftContent ? <span className={`${prefixClassName}__left__content`}>{leftContent}</span> : null }
      </div>
    );
  }

  renderRight = () => {
    const { prefixClassName, rightContent } = this.props;
    return (
      <div className={`${prefixClassName}__right`}>{rightContent}</div>
    );
  }

  render() {
    const {
      prefixClassName, className, style,
      mode, auto,
    } = this.props;
    const classes = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--dark`]: mode === 'dark',
        [`${prefixClassName}--light`]: mode === 'light',

        [`${prefixClassName}--auto`]: auto,
      },
    );

    return (
      <div className={classes} style={style}>
        {this.renderLeft()}
        {this.renderTitle()}
        {this.renderRight()}
      </div>
    );
  }
}
