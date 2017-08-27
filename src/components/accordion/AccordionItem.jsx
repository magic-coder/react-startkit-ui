import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';

// https://github.com/daviferreira/react-sanfona/blob/master/src/AccordionItem/index.jsx

export default class AccordionItem extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    index: 0,
    children: null,
    onChange: () => {},
  }

  static Header = AccordionHeader;
  static Body = AccordionBody;

  constructor(props) {
    super(props);

    this.state = {
      maxHeight: props.active ? 'none' : 0,
      overflow: props.active ? 'visible' : 'hidden',
      duration: 300,
    };
  }

  componentDidUpdate() {
    const { active } = this.props;
    if (active) {
      this.setBodyStyle();
    }
  }

  onHandleClick = (activeIndex) => {
    console.log('AccordionItem =>>', activeIndex);
    this.props.onChange(activeIndex);
  }

  setBodyStyle = () => {
    const { active } = this.props;
    // console.log(active);
    const $bodyElement = this.bodyElement.bodyElement;
    // console.log($bodyElement);

    this.setState({
      maxHeight: active ? `${$bodyElement.scrollHeight}px` : 0,
      overflow: active ? 'visible' : 'hidden',
    });
  }

  render() {
    const { label, index, active, children } = this.props;
    const accordionItemClassNames = classNames('accordion__item', {
      'accordion__item--active': active,
    });

    return (
      <div className={accordionItemClassNames}>
        <AccordionHeader
          index={index}
          label={label}
          active={active}
          onHandleClick={(currentIndex) => { this.onHandleClick(currentIndex); }}
        />
        <AccordionBody
          index={index}
          active={active}
          maxHeight={this.state.maxHeight}
          duration={this.state.duration}
          overflow={this.state.overflow}
          ref={(ele) => { this.bodyElement = ele; }}
        >
          {children}
        </AccordionBody>
      </div>
    );
  }
}
