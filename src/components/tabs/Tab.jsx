import React from 'react';
import PropTypes from 'prop-types';

export default class Tab extends React.Component {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    active: PropTypes.bool.isRequired,
    tabKey: PropTypes.string.isRequired,
    onTabClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tab: '',
    active: false,
    disabled: false,
    tabKey: '',
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
    const { tab, tabKey } = this.props;
    const tabClassName = this.getTabClassName();

    return (
      <div
        className={tabClassName}
        role="tab"
        tabIndex={tabKey}
        onClick={() => { this.handleClick(tabKey); }}
      >
        {tab}
      </div>
    );
  }
}
