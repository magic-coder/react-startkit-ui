import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ListItemBrief extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    prefixClassName: 'list-item__brief',
  }

  render() {
    const {
      prefixClassName, className, style, children,
    } = this.props;
    const classes = classNames(prefixClassName, className);
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }
}
