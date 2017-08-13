import React from 'react';
import PropTypes from 'prop-types';

export default class TabPane extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    active: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    active: false,
  }

  render() {
    const { active, children } = this.props;
    const paneClassName = active ? 'tab__pane tab__pane--active' : 'tab__pane tab__pane--inactive';

    return (
      <div className={paneClassName}>{children}</div>
    );
  }
}
