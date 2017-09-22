import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './scss';

export default class Paper extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    // 是否为圆形的纸片
    circle: PropTypes.bool,
    // 是否为圆角的纸片
    rounded: PropTypes.bool,
    zDepth: PropTypes.oneOf([
      1, 2, 3, 4, 5,
    ]),
  }

  static defaultProps = {
    prefixClassName: 'paper',
    circle: false,
    rounded: true,
    zDepth: 1,
  }

  render() {
    const { prefixClassName, className, style, children, circle, rounded, zDepth } = this.props;

    const paperClasses = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--circle`]: circle,
        [`${prefixClassName}--round`]: rounded,
      },
      `${prefixClassName}--depth-${zDepth}`,
    );

    return (
      <div className={paperClasses} style={style}>{children}</div>
    );
  }
}
