import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class AbstractButton extends React.Component {
  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    // 按钮类型 - 是否禁用
    disabled: PropTypes.bool,
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
    disabled: false,
    tag: 'button',
    href: 'javascript:;',
    onClick: () => {},
  }

  /**
   * 渲染 路由类型
   */
  renderLink() {
    const { className, style, to, replace, onClick, children } = this.props;
    return (
      <Link
        className={className}
        style={style}
        to={to}
        replace={replace}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  /**
   * 渲染 按钮类型
   */
  renderButton() {
    const { className, style, href, disabled, onClick, children, tag } = this.props;
    const buttonProps = {
      className,
      style,
      disabled,
      onClick,
      children,
      role: 'button',
      tabIndex: '-1',
    };

    // a 标签的按钮, 增加 href 属性
    if (tag.toLowerCase() === 'a') {
      buttonProps.href = href;
    }

    return (
      React.createElement(tag, buttonProps, children)
    );
  }

  render() {
    const { to } = this.props;

    const buttonType = to ? 'link' : 'button';

    let buttonContent;
    switch (buttonType) {
      case 'button':
        buttonContent = this.renderButton();
        break;
      default:
        buttonContent = this.renderLink();
    }

    return (
      buttonContent
    );
  }
}
