import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../icon';

import './scss';

export default class SearchBar extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    // 自定义 className
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    // 样式
    style: PropTypes.object,
    // 导航模式
    mode: PropTypes.oneOf([
      'dark', 'light',
    ]),
    // 搜索框默认值
    defaultValue: PropTypes.string,
    // 搜索框的当前值
    value: PropTypes.string,
    // 默认提示内容
    placeholder: PropTypes.string,

    // 左边内容
    leftContent: PropTypes.any,
    // 右边内容
    rightContent: PropTypes.any,

    // 输入框左边内容
    leftInputContent: PropTypes.any,
    // 输入框右边内容
    rightInputContent: PropTypes.any,
    // 页面初始化时 SearchBar 自动获取光标, 每个页面只有一个 SearchBar 的 autoFocus 会生效. (不保证兼容所有浏览器)
    autoFocus: PropTypes.bool,
    // 手动聚焦 SearchBar (在 focused 设置为 true 后,  需要在 onFocus 或者 onBlur 时再次将该属性设置为 false )
    focused: PropTypes.bool,

    // 左边点击回调函数
    onLeftClick: PropTypes.func,
    // 右边点击回调函数
    onRightClick: PropTypes.func,
    // 输入框 focus 事件
    onFocus: PropTypes.func,
    // 输入框 blur 事件
    onBlur: PropTypes.func,
    // 输入框 change 事件
    onChange: PropTypes.func,
    // 输入框 input 事件
    onInput: PropTypes.func,
    // 输入框 reset 事件
    onReset: PropTypes.func,
    // 输入框 submit 事件
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'search-bar',
    mode: 'dark',
    defaultValue: '',
    value: '',
    placeholder: '输入搜索关键词',
    leftContent: <Icon type="left" />,
    rightContent: '搜索',
    leftInputContent: <Icon type="search" size="xxs" />,
    autoFocus: false,
    focused: false,

    onLeftClick: () => {},
    onRightClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onChange: () => {},
    onInput: () => {},
    onReset: () => {},
    onSubmit: () => {},
  }

  constructor(props) {
    super(props);

    // 输入框当前的值. 设置的当前值 > 设置的默认值 > 空值
    let value;
    if ('value' in props) {
      value = props.value || '';
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      value = '';
    }

    this.state = {
      value,
      resetShow: false,
      focused: props.focused || false,
    };
  }

  componentDidMount() {
    if (this.props.autoFocus || this.state.focused) {
      this.searchInputRef.focus();
    }
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if ('focused' in nextProps) {
      this.setState({
        focused: nextProps.focused,
      });
      this.onWatchInputValue();
    }
  }

  componentDidUpdate() {
    if (this.state.focused) {
      this.searchInputRef.focus();
      this.onWatchInputValue();
    }
  }

  componentWillUnmount() {
    if (this.scrollIntoViewTimeout) {
      clearTimeout(this.scrollIntoViewTimeout);
      this.scrollIntoViewTimeout = null;
    }
  }

  /**
   * 监听输入框的值
   * 
   * 不为空时, 显示重置按钮, 并且触发组件的 onRest 事件
   */
  onWatchInputValue = () => {
    const { value } = this.state;
    this.setState({
      resetShow: value !== '',
    });
  }

  /**
   * submit 事件 (点击键盘的 enter)
   */
  onSubmit = (ev) => {
    ev.preventDefault();

    const returnValue = this.state.statevalue || this.props.defaultValue;
    this.props.onSubmit(returnValue);
    this.searchInputRef.blur();
  }

  /**
   * 监听 输入框 change 事件
   */
  handleChange = (ev) => {
    const value = ev.target.value;

    this.state = {
      value,
    };

    this.onWatchInputValue();
    this.props.onChange(value);
  }

  /**
   * 监听 输入框 input 事件
   */
  handleInput = (ev) => {
    const value = ev.target.value;

    this.state = {
      value,
    };

    this.props.onInput(value);
  }
  /**
   * 监听 输入框获取焦点事件
   */
  handleFocus = () => {
    this.onWatchInputValue();

    if (!('focused' in this.props)) {
      this.setState({
        focused: true,
      });
    }

    const returnValue = this.state.statevalue || this.props.defaultValue;
    this.props.onFocus(returnValue);

    if (document.activeElement.tagName.toLowerCase() === 'input') {
      this.scrollIntoViewTimeout = setTimeout(() => {
        try {
          document.activeElement.scrollIntoViewIfNeeded();
        } catch (err) {
          console.log(err);
        }
      }, 100);
    }
  }

  /**
   * 监听 输入框失去焦点事件
   */
  handleBlur = () => {
    // 延迟设置 clear 按钮隐藏
    setTimeout(() => {
      this.setState({
        resetShow: false,
      });
    }, 100);

    if (!('focused' in this.props)) {
      this.setState({
        focused: false,
      });
    }

    const returnValue = this.state.statevalue || this.props.defaultValue;
    this.props.onBlur(returnValue);
  }

  /**
   * 监听 重置按钮点击事件
   */
  handleResetClick = () => {
    this.state = {
      value: '',
    };

    this.onWatchInputValue();
    const returnValue = this.state.statevalue || this.props.defaultValue;
    this.props.onReset(returnValue);
    this.searchInputRef.focus();
  }

  handleLeftClick = () => {
    const { defaultValue, onLeftClick } = this.props;
    const { value } = this.state;
    onLeftClick(value || defaultValue);
  }

  handleRightClick = () => {
    const { defaultValue, onRightClick } = this.props;
    const { value } = this.state;
    onRightClick(value || defaultValue);
  }

  renderSearch = () => {
    const { prefixClassName } = this.props;

    return (
      <form
        className={`${prefixClassName}__form`}
        onSubmit={this.onSubmit}
        ref={(ele) => { this.searchFormRef = ele; }}
        action="#"
      >
        {this.renderSearchInputLeft()}
        {this.renderSearchInput()}
        {this.renderSearchInputRight()}
        {this.renderSearchInputReset()}
      </form>
    );
  }
  renderSearchInputLeft = () => {
    const { prefixClassName, leftInputContent } = this.props;
    return (
      <div className={`${prefixClassName}__input__front`}>{leftInputContent}</div>
    );
  }

  renderSearchInputRight = () => {
    const { prefixClassName, rightInputContent } = this.props;
    const { resetShow } = this.state;
    return (
      rightInputContent && !resetShow ? <div className={`${prefixClassName}__input__back`}>{rightInputContent}</div> : null
    );
  }

  renderSearchInputReset = () => {
    const { prefixClassName } = this.props;
    const { resetShow } = this.state;
    return (
      resetShow ? <div className={`${prefixClassName}__reset`} onClick={this.handleResetClick} role="button" tabIndex="0">
        <Icon type="close" size="xxs" />
      </div> : null
    );
  }

  renderSearchInput = () => {
    const { prefixClassName, defaultValue, placeholder } = this.props;
    const { value } = this.state;

    return (
      <input
        type="search"
        autoComplete="off"
        ref={(input) => { this.searchInputRef = input; }}
        className={`${prefixClassName}__input`}
        value={value}
        placeholder={defaultValue || placeholder}
        onChange={this.handleChange}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }

  renderLeft = () => {
    const { prefixClassName, leftContent } = this.props;
    return (
      leftContent ? <div
        className={`${prefixClassName}__left`}
        role="button"
        tabIndex="0"
        onClick={this.handleLeftClick}
      >
        {leftContent}
      </div> : null
    );
  }

  renderRight = () => {
    const { prefixClassName, rightContent } = this.props;
    return (
      rightContent ? <div
        className={`${prefixClassName}__right`}
        role="button"
        tabIndex="0"
        onClick={this.handleRightClick}
      >
        {rightContent}
      </div> : null
    );
  }

  render() {
    const {
      prefixClassName, className, style,
      mode,
    } = this.props;
    const classes = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--dark`]: mode === 'dark',
        [`${prefixClassName}--light`]: mode === 'light',
      },
    );

    return (
      <div className={classes} style={style}>
        {this.renderLeft()}
        {this.renderSearch()}
        {this.renderRight()}
      </div>
    );
  }
}
