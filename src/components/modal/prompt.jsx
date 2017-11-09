import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './Modal';
import closest from '../_utils/closest';
import getPlatform from '../_utils/getPlatform';

/**
 * 输入弹窗
 * 
 * actions item config:
 * 
 * @export
 * @param {any} options 
 * @returns 
 */
export default function prompt(options) {
  const {
    className, title, message, type, defaultValue, placeholders, callbackOrActions, platform,
  } = Object.assign({}, {
    className: '',
    title: '',
    message: '',
    type: 'default',
    defaultValue: '',
    placeholders: ['', ''],
    callbackOrActions: [],
    platform: 'auto', // 平台. 'ios', 'android'
  }, options);


  // 没有回调函数 or 动作 组, 返回警告信息.
  if (!callbackOrActions) {
    console.warn('Must specify callbackOrActions');
    return {
      close: () => {},
    };
  }

  const prefixClass = 'modal';

  const data = {};

  // 修改 输入框的值
  function onChange(e) {
    const target = e.target;
    const inputType = target.getAttribute('type');
    data[inputType] = target.value;
  }

  // 获取输入焦点
  const focusFn = (input) => {
    setTimeout(() => {
      if (input) {
        input.focus();

        // 处理输入光标在默认值的后面
        const len = input.value.length;
        if (len && document.selection) {
          const sel = input.createTextRange();
          sel.moveStart('character', len);
          sel.collapse();
          sel.select();
        } else if (typeof input.selectionStart === 'number' && typeof input.selectionEnd === 'number') {
          input.selectionStart = len;
          input.selectionEnd = len;
        }
      }
    }, 500);
  };

  // 输入框部分内容
  let inputDom;
  switch (type) {
    case 'login-password':
      inputDom = (
        <div className={`${prefixClass}__input__container`}>
          <div className={`${prefixClass}__input`}>
            <label htmlFor="modal-input-0">
              <input
                type="text"
                id="modal-input-0"
                value={data.text}
                defaultValue={defaultValue}
                ref={(input) => { focusFn(input); }}
                onChange={onChange}
                placeholder={placeholders[0]}
              />
            </label>
          </div>
          <div className={`${prefixClass}__input`}>
            <label htmlFor="modal-input-1">
              <input
                type="password"
                id="modal-input-1"
                value={data.password}
                defaultValue=""
                onChange={onChange}
                placeholder={placeholders[1]}
              />
            </label>
          </div>
        </div>
      );
      break;
    case 'secure-text':
      inputDom = (
        <div className={`${prefixClass}__input__container`}>
          <div className={`${prefixClass}__input`}>
            <label htmlFor="modal-input-0">
              <input
                type="password"
                id="modal-input-0"
                value={data.password}
                defaultValue=""
                ref={(input) => { focusFn(input); }}
                onChange={onChange}
                placeholder={placeholders[0]}
              />
            </label>
          </div>
        </div>
      );
      break;
    case 'plain-text':
    case 'default':
    default:
      inputDom = (
        <div className={`${prefixClass}__input__container`}>
          <div className={`${prefixClass}__input`}>
            <label htmlFor="modal-input-0">
              <input
                type="text"
                id="modal-input-0"
                value={data.text}
                defaultValue={defaultValue}
                ref={(input) => { focusFn(input); }}
                onChange={onChange}
                placeholder={placeholders[0]}
              />
            </label>
          </div>
        </div>
      );
      break;
  }

  const content = (
    <div>
      {message}
      {inputDom}
    </div>
  );

  const div = document.createElement('div');
  document.body.appendChild(div);

  // 关闭回调函数. 删除生成的 DOM
  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const getArgs = (func) => {
    const text = data.text || defaultValue || '';
    const password = data.password || '';

    if (type === 'login-password') {
      return func(text, password);
    } else if (type === 'secure-text') {
      return func(password || defaultValue);
    }

    return func(text);
  };

  // 获取 Actions
  let actions;
  if (typeof callbackOrActions === 'function') {
    actions = [
      { text: '取消' },
      { text: '确定', onPress: () => { getArgs(callbackOrActions); } },
    ];
  } else {
    actions = callbackOrActions.map((item) => {
      return {
        text: item.text,
        className: item.className,
        style: item.style,
        onPress: () => {
          if (item.onPress) {
            return getArgs(item.onPress);
          }
          return null;
        },
      };
    });
  }

  function onWrapTouchStart(ev) {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(ev.target, `.${prefixClass}__content`);
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
      prefixClass={prefixClass}
      className={className}
      closable={false}
      maskClosable={false}
      platform={currentPlatform}
      title={title}
      footer={footer}
      transitionName={transName}
      maskTransitionName={maskTransName}
      wrapProps={{ onTouchStart: onWrapTouchStart }}
    >
      <div className={`${prefixClass}__propmt__content`}>{content}</div>
    </Modal>, div,
  );

  return {
    close,
  };
}
