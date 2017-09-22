import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './scss';

export default class Menu extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    prefixClassName: 'menu-list',
  }

  render() {
    const { prefixClassName, className, style, children } = this.props;

    const menusClasses = classNames(
      prefixClassName,
      className,
    );

    return (
      <div className={menusClasses} style={style}>
        {children}
      </div>
    );
  }
}
