import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './svg';
import './scss';

export default class Icon extends React.Component {
  static propTypes = {
    // 类型
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    // 尺寸
    size: PropTypes.oneOf([
      'xxs', 'xs', 'sm', 'md', 'lg', 'xl',
    ]),
    // 自定义 className
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    // 样式
    style: PropTypes.object,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    size: 'sm',
  }

  render() {
    const { type, size, style, className, onClick } = this.props;
    const iconType = typeof type === 'object' ? type.id : type;
    const iconClassName = classNames('icon', className, {
      [`icon__${iconType}`]: true,
      [`icon--${size}`]: true,
    });

    return (
      <svg className={iconClassName} style={style} onClick={onClick}>
        <use xlinkHref={`#${iconType}`} />
      </svg>
    );
  }
}
