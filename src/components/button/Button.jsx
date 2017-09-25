import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../icon';

import './scss';

export default class Button extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    // 类型
    type: PropTypes.oneOf([
      'primary', 'secondary', 'default', 'link',
    ]),
    // button 原生的 type 值
    htmlType: PropTypes.string,
    // 尺寸
    size: PropTypes.oneOf([
      'small', 'default', 'large',
    ]),
    // 是否禁用
    disabled: PropTypes.bool,
    // 是否满屏
    fullWidth: PropTypes.bool,
    // 按钮图标. loading设置后此项设置失效
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    // 按钮图标的位置
    iconPosition: PropTypes.oneOf([
      'left', 'right',
    ]),
    // 设置按钮载入状态. 设置此状态后, 会替代原来设置的 icon
    loading: PropTypes.bool,
    // 幽灵属性，使按钮背景透明
    ghost: PropTypes.bool,
    // 设置按钮形状
    shape: PropTypes.oneOf([
      'circle',
    ]),
    // 点击回调函数
    onClick: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'button',
    type: 'default',
    htmlType: 'button',
    size: 'default',
    disabled: false,
    fullWidth: false,
    iconPosition: 'left',
    loading: false,
    ghost: false,
    onClick: () => {},
  }

  handleClick() {
    const { disabled, loading, onClick } = this.props;
    if (disabled || loading) {
      return;
    }

    if (onClick) {
      onClick();
    }
  }

  render() {
    const {
      prefixClassName, className, style, children,
      type, htmlType, size, icon, iconPosition, disabled, ghost, fullWidth, shape, loading,
    } = this.props;

    const buttonClasses = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--size-small`]: size === 'small',
        [`${prefixClassName}--size-large`]: size === 'large',

        [`${prefixClassName}__primary`]: type === 'primary',
        [`${prefixClassName}__secondary`]: type === 'secondary',
        [`${prefixClassName}__link`]: type === 'link',

        [`${prefixClassName}--disabled`]: disabled,
        [`${prefixClassName}--loading`]: loading,
        [`${prefixClassName}--full`]: fullWidth,
        [`${prefixClassName}--ghost`]: ghost,
        [`${prefixClassName}--${shape}`]: shape,
      },
    );

    let iconSize;
    if (size === 'small') {
      iconSize = 'xxs';
    } else if (size === 'default') {
      iconSize = 'xxs';
    } else {
      iconSize = 'sm';
    }
    let iconDom = typeof icon === 'string' ? <Icon type={icon} size={iconSize} /> : icon;

    // 加载中状态
    if (loading) {
      let loadingIconName = 'loading';
      if ((type === 'primary' && !ghost) || (type === 'secondaty' && !ghost)) {
        loadingIconName = 'loading-light';
      }
      iconDom = <Icon type={loadingIconName} size={iconSize} />;
    }

    const buttonDom = [
      (!icon && !loading) ? null : <i className={`${prefixClassName}__icon`} key="0">{iconDom}</i>,
      !children ? null : <span className={`${prefixClassName}__text`} key="1">{children}</span>,
    ];

    if (iconPosition === 'right') {
      buttonDom.reverse();
    }

    // 额外属性
    const extraProps = {};
    if (loading) {
      extraProps['data-loading'] = true;
    }

    return (
      <button
        className={buttonClasses}
        style={style}
        type={htmlType}
        disabled={disabled}
        {...extraProps}
        onClick={() => { this.handleClick(); }}
      >
        {buttonDom}
      </button>
    );
  }
}
