import React from 'react';
import PropTypes from 'prop-types';

export default class PanelHeader extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  }

  static defaultProps = {}

  render() {
    const { title, extra } = this.props;
    return (
      <div className="panel__header">
        <div className="panel__title">{title}</div>
        <div className="panel__header__extra">{extra}</div>
      </div>
    );
  }
}
