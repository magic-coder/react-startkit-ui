import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import AccordionItem from './AccordionItem';

import './scss';

export default class Accordion extends React.Component {
  static propTypes = {
    defaultActiveIndex: PropTypes.number, // 初始化选中面板的 index
    accordion: PropTypes.bool, // 手风琴模式
    children: PropTypes.any.isRequired,
    className: PropTypes.string, // 自定义的 className
    onChange: PropTypes.func, // 切换面板的回调
  }

  static defaultProps = {
    defaultActiveIndex: -1,
    children: null,
    accordion: false,
    onChange: () => {},
  }

  static Item = AccordionItem;

  constructor(props) {
    super(props);

    const activeIndex = props.defaultActiveIndex % props.children.length;
    const accordions = [];
    props.children.forEach((item, index) => {
      accordions.push({
        key: index.toString(),
        isActive: index === activeIndex,
      });
    });

    this.state = {
      accordions,
    };
  }

  /**
   * 手风琴 change
   * 
   * @params {*} handleIndex 当前点击的 index
   */
  onChange = (handleIndex) => {
    const { accordions } = this.state;
    const { accordion } = this.props;
    this.updateAccordions(handleIndex, accordions, accordion);

    const activeAccordionKeys = this.getActiveAccordionKeys();
    this.props.onChange(activeAccordionKeys);
  }

  /**
   * 获取展开的手风琴 keys
   */
  getActiveAccordionKeys = () => {
    const { accordions } = this.state;
    const activeAccordionKeys = [];
    accordions.forEach((accordionItem) => {
      if (accordionItem.isActive) {
        activeAccordionKeys.push(accordionItem.key);
      }
    });
    return activeAccordionKeys;
  }

  /**
   * 更新手风琴的状态
   * 
   * @params {*} handleIndex 当前点击的 index
   * @params {*} accordions 手风琴数组
   * @params {*} isAccordionMode 是否是手风琴模式
   */
  updateAccordions = (handleIndex, accordions, isAccordionMode) => {
    accordions.forEach((item, index) => {
      const accordionItem = item;
      if (index === handleIndex) {
        accordionItem.isActive = !accordionItem.isActive;
      } else if (isAccordionMode) {
        accordionItem.isActive = false;
      }
    });

    this.setState({
      accordions,
    });
  }

  renderItems = () => {
    const { accordions } = this.state;
    const { children } = this.props;

    if (!children) {
      return null;
    }

    let startIndex = 0;

    return children.map((accordionItem, index) => {
      const isActive = accordions[index].isActive;
      startIndex += 1;

      return (
        <AccordionItem
          key={`accordion-item-${startIndex}`}
          {...accordionItem.props}
          index={index}
          active={isActive}
          onChange={(handleIndex) => { this.onChange(handleIndex); }}
        />
      );
    });
  }

  render() {
    const { className } = this.props;
    const classes = classNames('accordion', className);

    return (
      <div
        className={classes}
      >
        {this.renderItems()}
      </div>
    );
  }
}
