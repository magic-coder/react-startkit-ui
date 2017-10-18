import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../icon';

export default class Notice extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.any,
    style: PropTypes.object,
    children: PropTypes.any,
    className: PropTypes.any,
    // 自动关闭的延迟时间. 毫秒
    duration: PropTypes.number,
    // 是否有关闭按钮
    closable: PropTypes.bool,
    // 鼠标在内容上是否阻止关闭通知
    hoverStopClose: PropTypes.bool,
    // 是否有遮罩层
    overlay: PropTypes.bool,
    // 关闭回调函数
    onClose: PropTypes.func,
  };

  static defaultProps = {
    style: {
      right: '50%',
    },
    closable: false,
    hoverStopClose: true,
    overlay: false,
    duration: 1500,
    onClose: () => {},
  };

  componentDidMount() {
    this.startCloseTimer();
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  close() {
    this.clearCloseTimer();
    this.props.onClose();
  }

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration);
    }
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  render() {
    const {
      prefixClassName, style, children, className,
      closable, overlay, hoverStopClose,
    } = this.props;

    const componentClass = `${prefixClassName}__notice`;
    const noticeClasses = classNames(
      componentClass,
      className,
      {
        [`${componentClass}--closable`]: closable,
      },
    );

    // 事件列表
    const events = hoverStopClose ? {
      onMouseEnter: this.clearCloseTimer,
      onMouseLeave: this.startCloseTimer,
    } : {};

    return (
      <div
        className={noticeClasses}
        style={style}
      >
        {!overlay ? null : <div className={`${componentClass}__overlay`} />}
        <div
          className={`${componentClass}__content`}
          {...events}
        >{children}</div>
        {
          !closable ? null : (
            <a
              className={`${componentClass}__close`}
              onClick={() => { this.close(); }}
              role="button"
              tabIndex="0"
            >
              <Icon type="close" size="xxs" className={`${componentClass}__close__icon`} />
            </a>
          )
        }
      </div>
    );
  }
}
