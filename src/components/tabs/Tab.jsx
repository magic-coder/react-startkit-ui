import React from 'react';
import PropTypes from 'prop-types';

export default class Tab extends React.Component {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    tabKey: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
  }

  static defaultTypes = {
    tab: '',
    active: false,
    tabKey: '',
    onTabClick: () => {},
  }

  handleClick = (index) => {
    this.props.onTabClick(index);
  }

  render() {
    const { tab, tabKey, active } = this.props;
    const tabClassName = active ? 'tabs__tab tabs__tab--active' : 'tabs__tab';
    return (
      <div
        className={tabClassName}
        role="tab"
        tabIndex={tabKey}
        onClick={() => { this.handleClick(tabKey); }}
      >
        {tab}
      </div>
    );
  }
}
