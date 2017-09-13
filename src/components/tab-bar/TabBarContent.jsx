import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class TabBarContent extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    children: PropTypes.any,
    // 是否选中
    selected: PropTypes.bool,
  }

  static defaultProps = {
    prefixClassName: 'tabbar__content',
    selected: false,
  }

  render() {
    const {
      prefixClassName, className, selected, children,
    } = this.props;

    const tabBarItemClasses = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--active`]: selected,
        [`${prefixClassName}--inactive`]: !selected,
      },
    );

    return (
      <div
        className={tabBarItemClasses}
      >
        {children}
      </div>
    );
  }
}
