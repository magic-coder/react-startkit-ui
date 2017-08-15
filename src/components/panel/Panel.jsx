import React from 'react';
import PropTypes from 'prop-types';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import PanelFooter from './PanelFooter';

import './scss';

export default class Panel extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  static defaultProps = {
    children: null,
  }

  static Header = PanelHeader;
  static Body = PanelBody;
  static Footer = PanelFooter;

  render() {
    const { children } = this.props;
    return (
      <div className="panel">{children}</div>
    );
  }
}
