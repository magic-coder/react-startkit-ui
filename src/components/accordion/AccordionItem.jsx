import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';

export default class AccordionItem extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    index: 0,
    disabled: false,
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

  componentDidUpdate(prevProps) {
    const { active, children } = this.props;

    if (prevProps.active !== active) {
      if (active) {
        this.handleCollapse();
      } else {
        this.handleExpand();
      }
    } else if (prevProps.children !== children) {
      this.setBodyStyle();
    }
  }

  onHandleClick = (handleIndex) => {
    // 当前为禁用项
    if (this.props.disabled) {
      return;
    }
    this.props.onChange(handleIndex);
  }

  setBodyStyle = () => {
    const { active } = this.props;
    const $bodyElement = this.bodyElement.bodyElement;

    this.setState({
      maxHeight: active ? `${$bodyElement.scrollHeight}px` : 0,
      overflow: active ? 'visible' : 'hidden',
    });
  }

  handleCollapse = () => {
    this.setBodyStyle();
  }

  handleExpand = () => {
    this.setBodyStyle();
  }

  render() {
    const { label, index, active, disabled, children } = this.props;
    const accordionItemClassNames = classNames('accordion__item', {
      'accordion__item--active': active,
      'accordion__item--disabled': disabled,
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
