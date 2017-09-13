import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Badge from '../badge';

export default class TabBarItem extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    title: PropTypes.string,
    // 是否选中
    selected: PropTypes.bool,
    // 未选中的字体颜色
    textColor: PropTypes.string,
    // 选中的字体颜色
    selectedTextColor: PropTypes.string,
    // 未选中的图标
    icon: PropTypes.any,
    // 选中的图标
    selectedIcon: PropTypes.any,
    // 徽标数
    badge: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    // 是否是小红点
    dot: PropTypes.bool,

    onClick: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'tabbar__list__item',
    selected: false,
    dot: false,
    onClick: () => {},
  }

  /**
   * 渲染 图标
   */
  renderIcon = () => {
    const { prefixClassName, title, selected,
      icon, selectedIcon,
    } = this.props;

    const iconRes = selected ? selectedIcon : icon;

    // 未设置 icon 返回空
    if (!iconRes) {
      return null;
    }

    const iconDOM = React.isValidElement(iconRes) ? iconRes : (
      <img className={`${prefixClassName}__image`} src={iconRes.uri || iconRes} alt={title} />
    );

    return (
      <div className={`${prefixClassName}__icon`}>{iconDOM}</div>
    );
  }

  /**
   * 渲染 标题
   */
  renderTitle = () => {
    const { prefixClassName, title, selected, textColor, selectedTextColor } = this.props;

    const style = {
      color: selected ? selectedTextColor : textColor,
    };

    return (
      !title ? null : <p className={`${prefixClassName}__title`} style={style}>{title}</p>
    );
  }

  /**
   * 渲染 Item
   * 
   * @memberof TabBarItem
   */
  renderItem = () => {
    const { prefixClassName, badge, dot } = this.props;

    // 有徽标数
    if (badge) {
      return (
        <div
          className={`${prefixClassName}__wrapper`}
        >
          <Badge text={badge} className={`${prefixClassName}__badge`}>
            {this.renderIcon()}
            {this.renderTitle()}
          </Badge>
        </div>
      );
    }

    // 小红点
    if (dot) {
      return (
        <div className={`${prefixClassName}__wrapper`}>
          <Badge dot className={`${prefixClassName}__dot`}>
            {this.renderIcon()}
            {this.renderTitle()}
          </Badge>
        </div>
      );
    }

    return (
      <div className={`${prefixClassName}__wrapper`}>
        {this.renderIcon()}
        {this.renderTitle()}
      </div>
    );
  }

  render() {
    const {
      prefixClassName, className,
      selected, textColor, selectedTextColor, onClick,
    } = this.props;

    const tabBarItemClasses = classNames(
      prefixClassName,
      className,
    );

    const style = {
      color: selected ? selectedTextColor : textColor,
    };

    return (
      <div
        className={tabBarItemClasses}
        style={style}
        onClick={onClick}
        role="tab"
        tabIndex="0"
      >
        {this.renderItem()}
      </div>
    );
  }
}
