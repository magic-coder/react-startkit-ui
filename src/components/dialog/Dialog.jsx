import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';

import LazyRenderBox from './LazyRenderBox';

export default class Dialog extends React.Component {
  static propTypes = {
    prefixClass: PropTypes.string,
    className: PropTypes.string,
    wrapClassName: PropTypes.string,
    wrapProps: PropTypes.object,
    wrapStyle: PropTypes.object,
    style: PropTypes.object,
    zIndex: PropTypes.number,
    bodyStyle: PropTypes.object,
    children: PropTypes.any,
    // 是否显示
    visible: PropTypes.bool,
    // 弹窗标题
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    // 弹窗底部
    footer: PropTypes.element,
    // 是否显示关闭按钮
    closable: PropTypes.bool,
    // 是否有遮罩层
    mask: PropTypes.bool,
    // 遮罩层样式
    maskStyle: PropTypes.object,
    // 遮罩层是否可点击
    maskClosable: PropTypes.bool,
    // 是否居中
    center: PropTypes.bool,
    animation: PropTypes.string,
    transitionName: PropTypes.string,
    maskAnimation: PropTypes.string,
    maskTransitionName: PropTypes.string,
    // 关闭回调
    onClose: PropTypes.func,
    // 关闭运动开始回调函数
    onAnimateLeave: PropTypes.func,
    // 关闭后回调函数
    afterClose: PropTypes.func,
  }

  static defaultProps = {
    prefixClass: 'dialog',
    visible: false,
    closable: true,
    mask: true,
    maskClosable: true,
    center: false,
    animation: 'zoom',
    maskAnimation: 'fade',
    onClose: () => {},
    onAnimateLeave: () => {},
    afterClose: () => {},
  };

  static dialogRef;
  static bodyRef;
  static headerRef;
  static footerRef;
  static wrapRef;

  onAnimateAppear = () => {
    document.body.style.overflow = 'hidden';
  }

  onAnimateLeave = () => {
    document.body.style.overflow = '';

    if (this.wrapRef) {
      this.wrapRef.style.display = 'none';
    }
    if (this.props.onAnimateLeave) {
      this.props.onAnimateLeave();
    }
    if (this.props.afterClose) {
      this.props.afterClose();
    }
  }

  onMaskClick = (ev) => {
    if (ev.target === ev.currentTarget) {
      this.close(ev);
    }
  }

  getMaskTransitionName() {
    const { prefixClass, maskAnimation, maskTransitionName } = this.props;
    let currentTransitionName = maskTransitionName;
    if (!currentTransitionName && maskAnimation) {
      currentTransitionName = `${prefixClass}-${maskAnimation}`;
    }
    return currentTransitionName;
  }

  getTransitionName() {
    const { prefixClass, animation, transitionName } = this.props;
    let currentTransitionName = transitionName;
    if (!currentTransitionName && animation) {
      currentTransitionName = `${prefixClass}-${animation}`;
    }
    return currentTransitionName;
  }

  /**
   * 获取 Zindex
   * 
   * @memberof Dialog
   */
  getZIndexStyle() {
    const style = {};
    const { zIndex } = this.props;
    if (zIndex !== undefined) {
      style.zIndex = zIndex;
    }
  }

  /**
   * 获取 外层容器的样式
   * 
   * @returns 
   * @memberof Dialog
   */
  getWrapStyle() {
    const wrapStyle = this.props.wrapStyle || {};
    return { ...this.getZIndexStyle(), ...wrapStyle };
  }

  /**
   * 获取 遮罩层的样式
   * 
   * @returns 
   * @memberof Dialog
   */
  getMaskStyle() {
    const maskStyle = this.props.maskStyle || {};
    return { ...this.getZIndexStyle(), ...maskStyle };
  }

  // 遮罩层
  getMaskElement() {
    const { prefixClass, mask, visible } = this.props;
    let maskElement;

    if (mask) {
      const maskTransition = this.getMaskTransitionName();

      maskElement = (
        <LazyRenderBox
          key="mask-element"
          style={this.getMaskStyle()}
          className={`${prefixClass}__mask`}
          hiddenClassName={`${prefixClass}__mask--hidden`}
          visible={visible}
        />
      );

      if (maskTransition) {
        maskElement = (
          <Animate
            key="mask"
            showProp="visible"
            transitionAppear
            component=""
            transitionName={maskTransition}
          >
            {maskElement}
          </Animate>
        );
      }
    }

    return maskElement;
  }

  /**
   * 获取 弹窗内容
   * 
   * @memberof Dialog
   */
  getDialogElement() {
    const {
      prefixClass, className, style, bodyStyle,
      children, footer, title, closable,
      visible,
    } = this.props;

    // 脚部
    let footerEle;
    if (footer) {
      footerEle = (
        <div className={`${prefixClass}__footer`} ref={(ele) => { this.footerRef = ele; }}>
          {footer}
        </div>
      );
    }

    // 头部
    let headerEle;
    if (title) {
      headerEle = (
        <div className={`${prefixClass}__header`} ref={(el) => { this.headerRef = el; }}>
          <div className={`${prefixClass}__title`}>
            {title}
          </div>
        </div>
      );
    }

    // 是否有关闭按钮
    let closerEle;
    if (closable) {
      closerEle = (
        <button
          onClick={() => { this.close(); }}
          className={`${prefixClass}__close`}
        >
          <span className={`${prefixClass}__close__button`} />
        </button>
      );
    }

    // 弹窗内容
    const dialogElement = (
      <LazyRenderBox
        key="dialog-element"
        role="document"
        ref={(el) => { this.dialogRef = el; }}
        style={style || {}}
        className={`${prefixClass} ${className || ''}`}
        visible={visible}
      >
        <div className={`${prefixClass}__content`}>
          {closerEle}
          {headerEle}
          <div
            className={`${prefixClass}__body`}
            style={bodyStyle}
            ref={(el) => { this.bodyRef = el; }}
          >
            {children}
          </div>
          {footerEle}
        </div>
      </LazyRenderBox>
    );

    const transitionName = this.getTransitionName();

    return (
      <Animate
        key="dialog"
        showProp="visible"
        component=""
        onAppear={this.onAnimateAppear}
        onLeave={this.onAnimateLeave}
        transitionName={transitionName}
        transitionAppear
      >
        {dialogElement}
      </Animate>
    );
  }

  close(ev) {
    if (this.props.onClose) {
      this.props.onClose(ev);
    }
  }

  render() {
    const { prefixClass, wrapClassName, center, maskClosable, visible } = this.props;

    const wrapClasses = classNames(
      `${prefixClass}__wrap`,
      wrapClassName,
      {
        [`${prefixClass}__wrap--center`]: center,
      },
    );

    const style = this.getWrapStyle();

    // 如果显示状态, 删除行内样式的可视属性
    if (visible) {
      style.display = null;
    }

    return (
      <div>
        {this.getMaskElement()}
        <div
          className={wrapClasses}
          style={style}
          ref={(ele) => { this.wrapRef = ele; }}
          role="presentation"
          onClick={maskClosable ? this.onMaskClick : undefined}
          {...this.props.wrapProps}
        >
          {this.getDialogElement()}
        </div>
      </div>
    );
  }
}
