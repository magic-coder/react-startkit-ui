import React from 'react';
import PropTypes from 'prop-types';

import './scss';

export default class WingBlank extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    size: PropTypes.string, // 两翼留白的间距. 可选 sm, md, lg
  }

  static defaultProps = {
    children: null,
    size: 'lg',
  }

  render() {
    const { size, children } = this.props;
    return (
      <div className={`wingblank wingblank--${size}`}>
        {children}
      </div>
    );
  }
}
