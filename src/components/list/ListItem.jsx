import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListItemBrief from './ListItemBrief';

export default class ListItem extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    thumb: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    // 箭头方向(右, 上, 下). 如果是 empty, 则存在对应的dom, 但是不显示
    arrow: PropTypes.oneOf([
      'horizontal', 'down', 'up', 'empty',
    ]),
    // 内容对齐方式
    align: PropTypes.oneOf([
      'middle', 'top', 'bottom',
    ]),
    // 是否多行
    multipleLine: PropTypes.bool,
    // 是否换行
    wrap: PropTypes.bool,
    // 是否禁用
    disabled: PropTypes.bool,
    // 点击事件的回调函数
    onClick: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'list-item',
    align: 'middle',
    multipleLine: false,
    wrap: false,
    disabled: false,
  }

  static Brief = ListItemBrief;

  /**
   * 触发 点击回调函数
   */
  handleClick = () => {
    const { disabled, onClick } = this.props;
    if (disabled) {
      return;
    }

    onClick();
  }

  /**
   * 渲染 图标
   */
  renderThumb = () => {
    const { prefixClassName, thumb } = this.props;
    return (
      thumb ? <div className={`${prefixClassName}__thumb`}>{typeof thumb === 'string' ? <img src={thumb} alt="" /> : thumb }</div> : null
    );
  }

  /**
   * 渲染 主要内容
   */
  renderContent = () => {
    const { prefixClassName, children, extra, arrow, multipleLine, wrap } = this.props;
    const lineClassName = classNames({
      [`${prefixClassName}__line`]: true,
      [`${prefixClassName}__line--multiple`]: multipleLine,
      [`${prefixClassName}__line--wrap`]: wrap,
    });
    const arrowClassName = classNames({
      [`${prefixClassName}__arrow`]: true,
      [`${prefixClassName}__arrow--horizontal`]: arrow === 'horizontal',
      [`${prefixClassName}__arrow--vertical`]: arrow === 'down' || arrow === 'up',
      [`${prefixClassName}__arrow--vertical-up`]: arrow === 'up',
    });
    return (
      <div className={lineClassName}>
        {children !== undefined && <div className={`${prefixClassName}__content`}>{children}</div>}
        {extra !== undefined && <div className={`${prefixClassName}__extra`}>{extra}</div>}
        {arrow && <div className={arrowClassName} aria-hidden="true" />}
      </div>
    );
  }

  render() {
    const {
      prefixClassName, className, style, align, disabled,
    } = this.props;
    const classes = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--top`]: align === 'top',
        [`${prefixClassName}--middle`]: align === 'middle',
        [`${prefixClassName}--bottom`]: align === 'bottom',
        [`${prefixClassName}--disabled`]: disabled,
      },
    );
    return (
      <div
        className={classes}
        style={style}
        onClick={this.handleClick}
        role={'link'}
        tabIndex="0"
      >
        {this.renderThumb()}
        {this.renderContent()}
      </div>
    );
  }
}
