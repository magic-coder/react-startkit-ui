import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AbstractButton from '../internal';

import './scss';

export default class MenusItem extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    // 是否禁用
    disabled: PropTypes.bool,
    // 图标
    thumb: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    // 图标位置
    thumbPosition: PropTypes.oneOf([
      'left', 'right',
    ]),
    // 额外内容
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    // 是否显示箭头
    arrow: PropTypes.oneOf([
      true, false, 'empty',
    ]),
    // 按钮类型 - 渲染的标签
    tag: PropTypes.string,
    // 按钮类型 - 标签是 a 时显示的链接
    href: PropTypes.string,
    // 路由类型 - 跳转地址
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    // 路由类型 - 是否替换当前页面
    replace: PropTypes.bool,
    // 点击回调函数
    onClick: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'menu-item',
    thumbPosition: 'left',
    disabled: false,
    tag: 'a',
    onClick: () => {},
  }

  /**
   * 点击的回调函数
   * 
   * @param {any} ev 
   */
  handlerClick(ev) {
    if (this.props.disabled) {
      return;
    }

    this.props.onClick(ev);
  }

  /**
   * 渲染 图标
   * 
   * @returns 
   */
  renderThumb() {
    const { prefixClassName, thumb } = this.props;

    return (
      !thumb ? null : (
        <div key="0" className={`${prefixClassName}__thumb`}>{typeof thumb === 'string' ? <img src={thumb} alt="" /> : thumb }</div>
      )
    );
  }

  /**
   * 渲染 主题内容
   * 
   * @returns 
   */
  renderLine() {
    const { prefixClassName, children, extra, arrow } = this.props;

    const arrowClassName = classNames(
      {
        [`${prefixClassName}__arrow`]: true,
        [`${prefixClassName}__arrow--empty`]: arrow === 'empty',
      },
    );

    return (
      <div key="1" className={`${prefixClassName}__line`}>
        <div className={`${prefixClassName}__content`}>
          {children}
        </div>
        {
          !extra ? null : (
            <div className={`${prefixClassName}__extra`}>
              {extra}
            </div>
          )
        }
        {
          arrow && <div className={arrowClassName} aria-hidden="true" />
        }
      </div>
    );
  }

  render() {
    const {
      prefixClassName, className, style, disabled, thumbPosition,
      tag,
      href,
      to,
      replace,
    } = this.props;

    const menusClasses = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--disabled`]: disabled,
      },
    );

    const menuContent = [
      this.renderThumb(),
      this.renderLine(),
    ];

    // 图标在左
    if (thumbPosition === 'right') {
      menuContent.reverse();
    }

    const menuButtonProps = {
      disabled,
      tag,
      href,
      to,
      replace,
    };

    return (
      <AbstractButton
        className={menusClasses}
        style={style}
        {...menuButtonProps}
        onClick={(ev) => { this.handlerClick(ev); }}
      >
        { menuContent }
      </AbstractButton>
    );
  }
}
