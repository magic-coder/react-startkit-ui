import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './Modal';
import closest from '../_utils/closest';
import getPlatform from '../_utils/getPlatform';


/**
 * 警告/对话 & 确定弹窗
 * 
 * actions:
 * [{
 *    text: PropTypes.string,
 *    className: PropTypes.string,
 *    style: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
 *    onPress: PropTypes.func,
 * }]
 * 
 * platform: 'auto', // 'auto', 'ios', 'android'
 * 
 * @export
 * @param {any} options 
 * @returns 
 */
export default function alert(options) {
  const { className, title, message, actions, platform } = Object.assign({}, {
    className: '',
    title: '提示',
    message: '',
    actions: [{ text: '确定' }],
    platform: 'auto', // 'auto', 'ios', 'android'
  }, options);

  // 未填写 message 提示;
  if (!message) {
    console.warn('Must specify either an alert title, or message, or both');
    return {
      close: () => {},
    };
  }

  const prefixClass = 'modal';
  const div = document.createElement('div');
  document.body.appendChild(div);

  // 关闭回调函数. 删除生成的 DOM
  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function onWrapTouchStart(ev) {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(ev.target, `.${prefixClass}__footer`);
    if (!pNode) {
      ev.preventDefault();
    }
  }


  // 底部内容
  const footer = actions.map((button) => {
    // 原点击回调函数
    const orginPress = button.onPress || function noop() {};
    button.onPress = () => {
      const res = orginPress();
      // 如果有异步操作, 则在异步操作中执行 close; 
      // 否则直接执行 close;
      if (res && res.then) {
        res.then(() => {
          close();
        });
      } else {
        close();
      }
    };

    return button;
  });

  /**
   * 获取 运动的名称
   * 
   * @param {any} platform 
   * @returns 
   */
  function getTransitionName(platformStr) {
    let transName = 'zoom';
    const currentPlatform = platformStr;

    if (currentPlatform === 'android') {
      transName = 'fade-slide';
    }

    return transName;
  }

  const currentPlatform = getPlatform(platform);
  const transName = getTransitionName(currentPlatform);
  const maskTransName = 'fade';

  ReactDOM.render(
    <Modal
      visible
      transparent
      className={className}
      title={title}
      closable={false}
      maskClosable={false}
      footer={footer}
      transitionName={transName}
      maskTransitionName={maskTransName}
      platform={currentPlatform}
      wrapProps={{ onTouchStart: onWrapTouchStart }}
    >
      <div className={`${prefixClass}__alert__content`}>{message}</div>
    </Modal>, div,
  );

  // 返回 关闭函数, 方便外部可以控制关闭
  return {
    close,
  };
}
