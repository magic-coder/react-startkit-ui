import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './scss';

export default class Flex extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    // 子元素
    children: PropTypes.any,
    // 行内样式
    style: PropTypes.object,
    // 自定义 class
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    // 子元素在父容器中的位置
    direction: PropTypes.oneOf([
      'row', 'row-reverse', 'column', 'column-reverse',
    ]),
    // 子元素的换行方式
    wrap: PropTypes.oneOf([
      'nowrap', 'wrap', 'wrap-reverse',
    ]),
    // 子元素在主轴上的对齐方式
    justify: PropTypes.oneOf([
      'start', 'end', 'center', 'between', 'around',
    ]),
    // 子元素在交叉轴上的对齐方式
    align: PropTypes.oneOf([
      'start', 'end', 'center', 'baseline', 'stretch',
    ]),
    // 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
    alignContent: PropTypes.oneOf([
      'start', 'end', 'center', 'baseline', 'stretch',
    ]),
  }

  static defaultProps = {
    prefixClassName: 'flexbox',
    align: 'center',
  }

  render() {
    const {
      prefixClassName, children, style, className,
      direction, wrap, justify, align, alignContent,
    } = this.props;
    const classes = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}-dir--row`]: direction === 'row',
        [`${prefixClassName}-dir--row-reverse`]: direction === 'row-reverse',
        [`${prefixClassName}-dir--column`]: direction === 'column',
        [`${prefixClassName}-dir--column-reverse`]: direction === 'column-reverse',
      },
      {
        [`${prefixClassName}--nowrap`]: wrap === 'nowrap',
        [`${prefixClassName}--wrap`]: wrap === 'wrap',
        [`${prefixClassName}--wrap-reverse`]: wrap === 'wrap-reverse',
      },
      {
        [`${prefixClassName}-justify--start`]: justify === 'start',
        [`${prefixClassName}-justify--end`]: justify === 'end',
        [`${prefixClassName}-justify--center`]: justify === 'center',
        [`${prefixClassName}-justify--between`]: justify === 'between',
        [`${prefixClassName}-justify--around`]: justify === 'around',
      },
      {
        [`${prefixClassName}-align--start`]: align === 'start',
        [`${prefixClassName}-align--center`]: align === 'center',
        [`${prefixClassName}-align--end`]: align === 'end',
        [`${prefixClassName}-align--baseline`]: align === 'baseline',
        [`${prefixClassName}-align--stretch`]: align === 'stretch',
      },
      {
        [`${prefixClassName}-align-content--start`]: alignContent === 'start',
        [`${prefixClassName}-align-content--end`]: alignContent === 'end',
        [`${prefixClassName}-align-content--center`]: alignContent === 'center',
        [`${prefixClassName}-align-content--between`]: alignContent === 'between',
        [`${prefixClassName}-align-content--around`]: alignContent === 'around',
        [`${prefixClassName}-align-content--stretch`]: alignContent === 'stretch',
      },
    );

    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }
}
