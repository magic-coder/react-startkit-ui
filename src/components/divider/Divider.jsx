/**
 * Divider 主要用于管理和分隔列表和页面布局内的内容，以便让内容生成更好的视觉效果及空间感。
 * 示例中呈现的分隔线是一种弱规则，弱到不会去打扰到用户对内容的关注。
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './scss';

export default class Divider extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    // 自定义 className
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    // 样式
    style: PropTypes.object,
    // 是否缩进
    inset: PropTypes.bool,
    // 是否浅缩进
    shallowInset: PropTypes.bool,
    deepInset: PropTypes.bool,
  }

  static defaultProps = {
    prefixClassName: 'divider',
    inset: false,
    shallowInset: false,
    deepInset: false,
  }

  render() {
    const { prefixClassName, className, style, inset, shallowInset, deepInset } = this.props;
    const classes = classNames(
      prefixClassName,
      className, {
        [`${prefixClassName}--inset`]: inset,
        [`${prefixClassName}--shallow-inset`]: shallowInset,
        [`${prefixClassName}--deep-inset`]: deepInset,
      },
    );

    return (
      <div className={classes} style={style} />
    );
  }
}
