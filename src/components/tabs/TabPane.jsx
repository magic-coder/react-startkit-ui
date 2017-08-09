import React from 'react';
import PropTypes from 'prop-types';

export default class TabPane extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  static defaultTypes = {
    children: null,
  }

  render() {
    console.log('TabPanel =>>', this);
    return (
      <div className="tab__pane">{this.props.children}</div>
    );
  }
}
