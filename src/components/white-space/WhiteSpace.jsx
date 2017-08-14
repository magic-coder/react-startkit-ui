import React from 'react';
import PropTypes from 'prop-types';

import './scss';

export default class WhiteSpace extends React.Component {
  static propTypes = {
    size: PropTypes.string, // 上下留白的间距. 可选 xs, sm, md, lg, xl
  }

  static defaultProps = {
    size: 'md',
  }

  render() {
    const { size } = this.props;
    return (
      <div className={`whitespace whitespace--${size}`} />
    );
  }
}
