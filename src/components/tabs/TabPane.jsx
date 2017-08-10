import React from 'react';
import PropTypes from 'prop-types';

export default class TabPane extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    activeKey: PropTypes.string,
    paneKey: PropTypes.string,
  }

  static defaultTypes = {
    children: null,
  }

  render() {
    const { activeKey, paneKey } = this.props;
    const paneComputeClass = activeKey === paneKey ? 'tab__pane tab__pane--active' : 'tab__pane tab__pane--inactive';

    return (
      <div className={paneComputeClass}>{this.props.children}</div>
    );
  }
}
