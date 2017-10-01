import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ViewItem extends React.Component {
  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    children: PropTypes.any,
    scroll: PropTypes.oneOf([
      'x', 'y',
    ]),
  }

  static defaultProps = {
    scroll: 'x',
  }

  render() {
    const { className, children, scroll } = this.props;

    const eleClasses = classNames(
      `scrollview__item--${scroll}`,
      className,
    );
    const eleProps = Object.assign({}, this.props, {
      className: eleClasses,
    });
    // 移除 scroll 属性, 避免报错
    delete eleProps.scroll;

    return (
      React.cloneElement(children, { ...eleProps })
    );
  }
}
