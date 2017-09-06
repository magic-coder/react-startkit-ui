import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListItem from './ListItem';

import './scss';

export default class List extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    renderHeader: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    renderFooter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    children: PropTypes.any,
    // 标题是否在内部
    inside: PropTypes.bool,
    // body 是否有边框线
    hasLine: PropTypes.bool,
    // body 是否没有背景
    transparent: PropTypes.bool,
  }

  static defaultProps = {
    prefixClassName: 'list',
    hasLine: true,
    inside: false,
    transparent: false,
  }

  static Item = ListItem;

  /**
   * 渲染 头部
   * 
   * @memberof List
   */
  renderHeader = () => {
    const { prefixClassName, renderHeader } = this.props;
    return (
      renderHeader ? <div className={`${prefixClassName}__header`}>{typeof renderHeader === 'function' ? renderHeader() : renderHeader}</div> : null
    );
  }

  /**
   * 渲染 底部
   * 
   * @memberof List
   */
  renderFooter = () => {
    const { prefixClassName, renderFooter } = this.props;
    return (
      renderFooter ? <div className={`${prefixClassName}__footer`}>{typeof renderFooter === 'function' ? renderFooter() : renderFooter}</div> : null
    );
  }

  /**
   * 渲染 内容
   * 
   * @memberof List
   */
  renderBody = () => {
    const { prefixClassName, children } = this.props;
    return (
      children ? <div className={`${prefixClassName}__body`}>{children}</div> : null
    );
  }

  render() {
    const {
      prefixClassName, className, style,
      hasLine, transparent, inside,
    } = this.props;
    const classes = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--inside`]: inside,
        [`${prefixClassName}--line`]: hasLine,
        [`${prefixClassName}--transparent`]: transparent,
      },
    );
    return (
      <div className={classes} style={style}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  }
}
