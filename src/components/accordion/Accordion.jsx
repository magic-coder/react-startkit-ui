import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import AccordionItem from './AccordionItem';

import './scss';

export default class Accordion extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string, // 自定义的 className
    defaultActiveIndex: PropTypes.number, // 初始化选中面板的 index. 默认值: 无
    onChange: PropTypes.func, // 切换面板的回调
  }

  static defaultProps = {
    children: null,
    defaultActiveIndex: -1,
    onChange: () => {},
  }

  static Item = AccordionItem;

  constructor(props) {
    super(props);

    const activeIndex = props.defaultActiveIndex;
    this.state = {
      activeIndex,
    };
  }

  onChange = (activeIndex) => {
    this.props.onChange(activeIndex);
    this.setState({
      activeIndex,
    });
  }

  render() {
    const { activeIndex } = this.state;
    const { children, className } = this.props;
    const classes = classNames('accordion', className);

    let startIndex = 0;
    const accordionContent = children.map((accordionItem, index) => {
      startIndex += 1;
      const isActive = index === activeIndex;

      return (
        <AccordionItem
          key={`accordion-item-${startIndex}`}
          {...accordionItem.props}
          index={index}
          active={isActive}
          onChange={(currentIndex) => { this.onChange(currentIndex); }}
        />
      );
    });

    return (
      <div className={classes}>{accordionContent}</div>
    );
  }
}
