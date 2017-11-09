import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './Modal';
import closest from '../_utils/closest';
import getPlatform from '../_utils/getPlatform';

/**
 * 操作弹窗
 * 
 * @export
 * @param {any} options 
 * @returns 
 */
export default function operation(options) {
  const { className, actions, platform } = Object.assign({}, {
    className: '',
    actions: [{ text: '确定' }],
    platform: 'auto', // 'auto', 'ios', 'android'
  }, options);


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
      operation
      transparent
      className={`${prefixClass}__operation ${className}`}
      title=""
      closable={false}
      maskClosable
      onClose={close}
      footer={footer}
      transitionName={transName}
      maskTransitionName={maskTransName}
      platform={currentPlatform}
      wrapProps={{ onTouchStart: onWrapTouchStart }}
    />, div,
  );

  // 返回 关闭函数, 方便外部可以控制关闭
  return {
    close,
  };
}
