import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dialog from '../dialog';

import getPlatform from '../_utils/getPlatform';

import './scss';

export default class Modal extends React.Component {
  static propTypes = {
    prefixClass: PropTypes.string,
    className: PropTypes.string,
    wrapClassName: PropTypes.string,
    style: PropTypes.object,
    // 平台样式
    platform: PropTypes.oneOf([
      'auto', 'ios', 'android',
    ]),
    // 是否显示关闭按钮
    closable: PropTypes.bool,
    // 是否背景透明
    transparent: PropTypes.bool,
    // 是否是操作弹窗
    operation: PropTypes.bool,
    // 是否运动
    animated: PropTypes.bool,
    transitionName: PropTypes.string,
    maskTransitionName: PropTypes.string,
    // 按钮
    footer: PropTypes.array,
  }
  static defaultProps = {
    prefixClass: 'modal',
    transparent: true,
    operation: false,
    animated: true,
    footer: [],
    closable: true,
    platform: 'auto',
  };
  /**
   * 渲染 底部按钮
   * 
   * @param {any} button 
   * @param {any} prefixClass 
   * @param {any} i 
   * @memberof Modal
   */
  renderFooterButton = (button, prefixClass, i) => {
    // 自定义样式
    let buttonStyle = {};
    if (button.style) {
      buttonStyle = button.style;
      if (typeof buttonStyle === 'string') {
        const styleMap = {
          cancel: {},
          default: {},
          destructive: { color: 'red' },
        };
        buttonStyle = styleMap[buttonStyle] || {};
      }
    }

    // 点击回调
    let isFired = false;
    const onClickCallback = (ev) => {
      ev.preventDefault();
      if (isFired) {
        return;
      }
      isFired = true;
      if (button.onPress) {
        button.onPress();
      }
    };
    const key = `${prefixClass}-button-key-${i}`;
    const buttonClass = classNames(
      `${prefixClass}__button`,
      {
        [`${button.className}`]: button.className,
      },
    );

    return (
      <a
        className={buttonClass}
        style={buttonStyle}
        onClick={onClickCallback}
        key={key}
        role="button"
        tabIndex="-1"
      >
        {button.text || 'Button'}
      </a>
    );
  }

  render() {
    const {
      prefixClass, className, wrapClassName, style, transparent, operation, animated,
      transitionName, maskTransitionName, platform, footer, ...restProps
    } = this.props;

    const wrapClasses = classNames(
      wrapClassName,
    );

    // 当前设备系统标识
    const currentPlatform = getPlatform(platform);
    const classes = classNames(
      className,
      {
        [`${prefixClass}--transparent`]: transparent,

        [`${prefixClass}--ios`]: currentPlatform === 'ios',
        [`${prefixClass}--android`]: currentPlatform === 'android',
      },
    );

    let transName;
    let maskTransName;
    if (animated) {
      if (transparent) {
        transName = 'zoom';
        maskTransName = 'fade';

        if (currentPlatform === 'android') {
          transName = 'fade-slide';
        }
      } else {
        transName = 'slide-up';
        maskTransName = 'slide-up';
      }
    }

    // 底部按钮组的 class
    const btnGroupClass = classNames(
      `${prefixClass}__button__group--${footer.length > 2 ? 'v' : 'h'}`,
      `${prefixClass}__button__group--${operation ? 'operation' : 'normal'}`,
    );

    // 底部 DOM
    const footerDom = footer.length === 0 ? null : (
      <div className={btnGroupClass} role="group">
        {
          footer.map((button, i) => {
            return this.renderFooterButton(button, prefixClass, i);
          })
        }
      </div>
    );

    return (
      <Dialog
        {...restProps}
        className={classes}
        style={style}
        prefixClass={prefixClass}
        wrapClassName={wrapClasses}
        transitionName={transitionName || transName}
        maskTransitionName={maskTransitionName || maskTransName}
        footer={footerDom}
      />
    );
  }
}
