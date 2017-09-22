import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Heading from './MenuHeading';

import './scss';

export default class MenuGroup extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    // 菜单组标签
    label: PropTypes.any,
    // 菜单组标签 className
    labelClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }

  static defaultProps = {
    prefixClassName: 'menu-list__group',
  }

  render() {
    const { prefixClassName, className, style, children, label, labelClassName } = this.props;

    const menusClasses = classNames(
      prefixClassName,
      className,
    );

    return (
      <div className={menusClasses} style={style}>
        {
          !label ? null : (<Heading className={labelClassName}>{label}</Heading>)
        }
        {children}
      </div>
    );
  }
}
