import React from 'react';
import PropTypes from 'prop-types';

export default class Tab extends React.Component {
  static propTypes = {
    tab: PropTypes.string.isRequired,
  }

  static defaultTypes = {
    tab: '',
  }

  render() {
    const { tab } = this.props;
    return (
      <div
        className="tabs__tab"
        role="tab"
      >
        {tab}
      </div>
    );
  }
}
