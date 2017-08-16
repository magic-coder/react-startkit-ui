import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import PanelFooter from './PanelFooter';
import PanelMore from './PanelMore';

import './scss';

export default class Panel extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    customClassNames: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]), // 自定义的 className
  }

  static defaultProps = {
    children: null,
    customClassNames: {},
  }

  static Header = PanelHeader;
  static Body = PanelBody;
  static Footer = PanelFooter;
  static More = PanelMore;

  render() {
    const { children, customClassNames } = this.props;
    const classes = classNames('panel', customClassNames);
    return (
      <div className={classes}>{children}</div>
    );
  }
}
