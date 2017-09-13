import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Item from './TabBarItem';
import Content from './TabBarContent';

import './scss';

export default class TabBar extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    children: PropTypes.any,
    // tabbar 背景色
    backgroundColor: PropTypes.string,
    // 未选中的字体颜色
    textColor: PropTypes.string,
    // 选中的字体颜色
    selectedTextColor: PropTypes.string,
    // 是否隐藏
    hidden: PropTypes.bool,
  }

  static defaultProps = {
    prefixClassName: 'tabbar',
    backgroundColor: 'white',
    textColor: '#888',
    selectedTextColor: '#007fff',
    hidden: false,
  }

  /**
   * 渲染 Contents
   */
  renderTabBarContents = () => {
    const { prefixClassName, children } = this.props;

    const tabBarContentsClasses = classNames(
      `${prefixClassName}__contents`,
      `${prefixClassName}__contents--no-animated`,
    );

    const tabBarContents = children.map((tab) => {
      const contentProps = Object.assign({}, tab.props, {
        prefixClassName: `${prefixClassName}__content`,
      });

      return (
        <Content
          key={tab.key}
          {...contentProps}
        />
      );
    });

    return (
      <div className={tabBarContentsClasses}>
        {tabBarContents}
      </div>
    );
  }

  /**
   * 渲染 Lists
   */
  renderTabBarLists = () => {
    const { prefixClassName, textColor, selectedTextColor, children, hidden } = this.props;

    const tabBarListsClasses = classNames(
      `${prefixClassName}__list`,
      {
        [`${prefixClassName}__list--hidden`]: hidden,
      },
    );

    const tabBarLists = children.map((tab) => {
      return (
        <Item
          key={tab.key}
          textColor={textColor}
          selectedTextColor={selectedTextColor}
          {...tab.props}
        />
      );
    });

    return (
      <div className={tabBarListsClasses}>
        {tabBarLists}
      </div>
    );
  }

  render() {
    const { prefixClassName, className, backgroundColor } = this.props;

    const style = {
      backgroundColor,
    };

    const tabBarClasses = classNames(
      prefixClassName,
      className,
    );

    return (
      <div className={tabBarClasses} style={style}>
        {this.renderTabBarContents()}
        {this.renderTabBarLists()}
      </div>
    );
  }
}
