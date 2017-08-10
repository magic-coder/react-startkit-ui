import React from 'react';
import PropTypes from 'prop-types';

export default class Tab extends React.Component {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    tabKey: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
  }

  static defaultTypes = {
    tab: '',
    tabKey: '',
    onTabClick: () => {},
  }

  handleClick = (index) => {
    this.props.onTabClick(index);
  }

  render() {
    const { tab, tabKey } = this.props;
    return (
      <div
        className="tabs__tab"
        role="tab"
        tabIndex={tabKey}
        onClick={() => { this.handleClick(tabKey); }}
      >
        {tab}
      </div>
    );
  }
}
