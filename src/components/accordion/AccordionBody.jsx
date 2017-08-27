import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class AccordionBody extends React.Component {
  static propTypes = {
    // index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    duration: PropTypes.number,
    overflow: PropTypes.string,
  }

  static defaultProps = {
    // index: -1,
    active: false,
    children: null,
  }

  render() {
    const { children, active } = this.props;
    const accordionBodyClassNames = classNames('accordion__body', {
      'accordion__body--active': active,
      'accordion__body--inactive': !active,
    });
    const style = {
      maxHeight: this.props.maxHeight,
      overflow: this.props.overflow,
      transition: `max-height ${this.props.duration}ms ease`,
    };

    return (
      <div
        className={accordionBodyClassNames}
        style={style}
        ref={(ele) => { this.bodyElement = ele; }}
      >
        {children}
      </div>
    );
  }
}
