import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FlexItem extends React.Component {
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
    onClick: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'flexbox__item',
    align: 'center',
    onClick: () => {},
  }

  render() {
    const {
      prefixClassName, children, style, className, onClick,
    } = this.props;
    const classes = classNames(
      prefixClassName,
      className,
    );

    return (
      <div
        className={classes}
        style={style}
        role={'link'}
        tabIndex="0"
        onClick={() => { onClick(); }}
      >
        {children}
      </div>
    );
  }
}
