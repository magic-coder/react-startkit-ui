import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    inside: PropTypes.bool,
  }

  static defaultProps = {
    inside: false,
  }

  render() {
    const { title, extra, inside } = this.props;
    const headerClassName = classNames('panel__header', {
      'panel__header--inside': inside,
    });
    return (
      <div className={headerClassName}>
        <div className="panel__title">{title}</div>
        {extra ? <div className="panel__header__extra">{extra}</div> : null}
      </div>
    );
  }
}
