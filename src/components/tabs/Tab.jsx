import React from 'react';
import PropTypes from 'prop-types';

export default class Tab extends React.Component {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    active: PropTypes.bool.isRequired,
    tabKey: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    count: PropTypes.number,
    onTabClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tab: '',
    active: false,
    disabled: false,
    tabKey: '',
    pageSize: 4,
    count: 4,
    onTabClick: () => {},
  }

  /**
   * 获取 tab ClassName
   */
  getTabClassName = () => {
    const { disabled, active } = this.props;
    const classNames = ['tabs__tab'];

    if (disabled) {
      classNames.push('tabs__tab--disabled');
    } else if (active) {
      classNames.push('tabs__tab--active');
    }

    return classNames.join(' ');
  }

  /**
   * 点击事件
   */
  handleClick = (index) => {
    if (!this.props.disabled) {
      this.props.onTabClick(index);
    }
  }

  render() {
    const { tab, tabKey, pageSize, count } = this.props;
    const tabClassName = this.getTabClassName();
    // 数量超出一屏显示, 设置每项的 flex-base-width;
    let style;
    if (count > pageSize) {
      const percentWidth = (1 / pageSize) * 100;
      style = {
        flex: `0 0 ${percentWidth}%`,
      };
    } else {
      style = {};
    }

    return (
      <div
        className={tabClassName}
        role="tab"
        tabIndex={tabKey}
        onClick={() => { this.handleClick(tabKey); }}
        style={style}
      >
        {tab}
      </div>
    );
  }
}
