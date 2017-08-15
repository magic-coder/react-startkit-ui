import React from 'react';
import PropTypes from 'prop-types';

export default class PanelBody extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { children } = this.props;
    return (
      <div className="panel__body">{children}</div>
    );
  }
}
