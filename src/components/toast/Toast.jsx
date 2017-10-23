import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Notification from '../notification';

import './scss';

let messageInstance;
const prefixClassName = 'toast';

/**
 * 获取 提示信单例
 * 
 */
function getMessageInstance(overlayOpacity, position, transitionName, className, content) {
  // 如果存在提示信息单例. 则进行销毁
  if (messageInstance) {
    messageInstance.destroy();
    messageInstance = null;
  }

  // 创建轻弹窗单例
  Notification.newInstance({
    prefixClassName,
    style: {}, // clear notification default style
    transitionName,
    className: classNames({
      [`${prefixClassName}--overlay-opacity`]: overlayOpacity,
      [`${prefixClassName}--center`]: position === 'center',
      [`${prefixClassName}--bottom`]: position === 'bottom',
      [`${prefixClassName}--only-icon`]: !content,

      [`${className}`]: className,
    }),
  }, (instance) => { messageInstance = instance; });

  return messageInstance;
}


/**
 * 获取 运动名称
 * 
 * @param {any} transitionName 
 */
function getTransitionName(transitionName) {
  return `${prefixClassName}-${transitionName}`;
}

/**
 * 获取 轻提示内容
 * 
 * @param {any} icon 
 * @param {any} content 
 * @param {any} type 
 * @returns 
 */
function getToastContent(icon, content, type) {
  let iconDom = null;

  // 如果 icon 是 React 实例, 则直接赋值给 iconDom;
  // 否则, iconDom 为 Icon 实例;
  if (React.isValidElement(icon)) {
    iconDom = icon;
  } else {
    const iconType = ({
      info: '',
      success: 'success',
      fail: 'fail',
      offline: 'offline',
      loading: 'loading',
    })[type];

    iconDom = !iconType ? null : <Icon type={iconType} size="lg" />;
  }

  const toastTextClasses = classNames({
    [`${prefixClassName}__text`]: 1,
    [`${prefixClassName}__text__icon`]: iconDom,
  });

  return (
    <div className={toastTextClasses} role="alert">
      {iconDom}
      { content ? <div className={`${prefixClassName}__text__info`}>{content}</div> : null }
    </div>
  );
}

/**
 * 轻弹窗函数
 * 
 * @param {any} options 
 */
function notice(options) {
  const defaults = {
    className: '',
    icon: '', // 提示图标
    content: '', // 提示内容
    type: 'info', // 类型
    duration: 3000, // 自动关闭延迟时间
    overlay: false, // 是否显示遮罩层. 遮罩层默认全透明
    overlayOpacity: false, // 遮罩层是否半透明
    position: 'center', // 位置
    transitionName: 'fade', // 运动效果名称. ['fade', 'fadeBounce']
    onClose: () => {}, // 关闭回调函数
  };
  const {
    className, icon, content, type, overlay, overlayOpacity,
    position, duration, onClose, transitionName,
  } = Object.assign({}, defaults, options);

  const toastContent = getToastContent(icon, content, type);
  const effecTransitionName = getTransitionName(transitionName);

  let instance = getMessageInstance(
    overlayOpacity, position, effecTransitionName, className, content,
  );

  instance.notice({
    duration,
    overlay,
    style: {},
    hoverStopClose: false,
    content: toastContent,
    onClose: () => {
      if (onClose) {
        onClose();
      }
      // 为了有渐隐过程, 延迟销毁 DOM 
      clearTimeout(instance.destroyTimer);
      instance.destroyTimer = setTimeout(() => {
        instance.destroy();
        instance = null;
        messageInstance = null;
      }, 300);
    },
  });
}

export default {
  /**
   * 纯文字信息提示 轻弹窗
   * 
   * @param {any} options 
   * @returns 
   */
  info(options) {
    const config = Object.assign({}, options, {
      type: 'info',
    });
    return notice(config);
  },
  /**
   * 成功提示 轻弹窗
   * 
   * @param {any} options 
   * @returns 
   */
  success(options) {
    const config = Object.assign({}, options, {
      type: 'success',
    });
    return notice(config);
  },
  /**
   * 失败提示 轻弹窗
   * 
   * @param {any} options 
   * @returns 
   */
  fail(options) {
    const config = Object.assign({}, options, {
      type: 'fail',
    });
    return notice(config);
  },
  /**
   * 断网 轻弹窗
   * 
   * @param {any} options 
   * @returns 
   */
  offline(options) {
    const config = Object.assign({}, options, {
      type: 'offline',
    });
    return notice(config);
  },
  /**
   * 加载中 轻弹窗
   * 
   * @param {any} options 
   * @returns 
   */
  loading(options) {
    const config = Object.assign({}, options, {
      type: 'loading',
      overlay: true,
    });
    return notice(config);
  },
  /**
   * 自定义图标 轻弹窗
   * 
   * @param {any} options 
   * @returns 
   */
  custom(options) {
    const config = Object.assign({}, options, {});
    return notice(config);
  },
  /**
   * 显示
   * 
   * @param {any} options 
   * @returns 
   */
  show(options) {
    return notice(options);
  },
  /**
   * 隐藏
   * 
   * @param {any} options 
   * @returns 
   */
  hide() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
