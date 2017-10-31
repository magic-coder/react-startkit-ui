import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './scss';

export default class SegmentedControl extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.any,
    style: PropTypes.object,
    // 选项数组, 值是字符串
    values: PropTypes.array,
    // 选中项在数组中的索引
    selectedIndex: PropTypes.number,
    // 是否禁用
    disabled: PropTypes.bool,
    // 主色调
    tintColor: PropTypes.string,
    // 回调函数, 其中 ev.nativeEvent.selectedSegmentIndex 是选中项索引, ev.nativeEvent.value 是选中的值.
    onChange: PropTypes.func,
    // 回调函数
    onValueChange: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'segment',
    values: [],
    selectedIndex: 0,
    disabled: false,
    tintColor: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.selectedIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  onClick(ev, index, value) {
    const { disabled, onChange, onValueChange } = this.props;

    // 不禁用 && 非当前选中项
    if (!disabled && this.state.selectedIndex !== index) {
      // just do a mock so that the api to be the same as react-native
      ev.nativeEvent = ev.nativeEvent ? ev.nativeEvent : {};
      ev.nativeEvent.selectedSegmentIndex = index;
      ev.nativeEvent.value = value;

      if (onChange) {
        onChange(ev);
      }

      if (onValueChange) {
        onValueChange(value);
      }

      this.setState({
        selectedIndex: index,
      });
    }
  }

  renderSegmentItem = (index, value, selected) => {
    const { prefixClassName, disabled, tintColor } = this.props;

    const key = `segment-key-${index}`;
    const itemClasses = classNames(
      `${prefixClassName}__item`,
      {
        [`${prefixClassName}__item--selected`]: selected,
      },
    );

    const itemStyle = {
      color: selected ? '#fff' : tintColor,
      backgroundColor: selected ? tintColor : 'transparent',
      borderColor: tintColor,
    };

    return (
      <div
        className={itemClasses}
        style={itemStyle}
        role="tab"
        tabIndex="-1"
        key={key}
        onClick={
          disabled ? undefined : (ev) => { this.onClick(ev, index, value); }
        }
      >
        {value}
      </div>
    );
  }

  render() {
    const { prefixClassName, className, style, values, disabled } = this.props;

    const segmentClasses = classNames(
      prefixClassName,
      className, {
        [`${prefixClassName}--disabled`]: disabled,
      },
    );

    const segmentContent = values.map((value, index) => {
      return this.renderSegmentItem(index, value, index === this.state.selectedIndex);
    });

    return (
      <div className={segmentClasses} style={style}>
        {segmentContent}
      </div>
    );
  }
}
