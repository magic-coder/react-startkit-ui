import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class AccordionHeader extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.element,
    ]),
    onHandleClick: PropTypes.func,
  }

  static defaultProps = {
    active: false,
    onHandleClick: () => {},
  }

  handleClick = (index) => {
    this.props.onHandleClick(index);
  }

  render() {
    const { index, label, active, extra } = this.props;
    let extraContent = '';
    if (extra) {
      extraContent = <div className="accordion__header__extra">{extra}</div>;
    }

    const accordionHeaderClassNames = classNames('accordion__header', {
      'accordion__header--active': active,
    });

    return (
      <div
        className={accordionHeaderClassNames}
        role="tab"
        tabIndex={index}
        onClick={() => { this.handleClick(index); }}
      >
        <div className="accordion__title">{label}</div>
        {extraContent}
        <i className="accordion__header__icon" />
      </div>
    );
  }
}
