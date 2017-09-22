import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import addEventListener from '@/utils/Dom/addEventListener';
import contains from '@/utils/Dom/contains';

import './scss';

class Popover extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    children: PropTypes.any,
    // 是否显示
    visible: PropTypes.bool,
    // 位置
    placement: PropTypes.oneOf([
      'left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight',
    ]),
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    // 是否有遮罩层
    overlay: PropTypes.bool,
    // 是否有遮罩层点击回调函数
    overlayClosable: PropTypes.bool,
    // 关闭回调函数
    close: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'popover',
    visible: false,
    placement: 'bottomRight', // 'left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight',
    offsetX: 0, // 位置 X 轴偏移值
    offsetY: 0, // 位置 Y 轴偏移值
    overlay: false,
    overlayClosable: true,
    close: () => {},
  }

  componentWillMount() {
    // 创建装载的空 div
    this._wrapper = document.createElement('div');
    document.body.appendChild(this._wrapper);
  }

  componentDidMount() {
    if (this.props.visible) {
      this.renderPopover(this.props);
      this.setPosition();
    }
  }

  componentWillReceiveProps(nextProps) {
    // 创建 Popover DOM
    if (nextProps.visible && !this.props.visible) {
      this.renderPopover(this.props);
      this.setPosition();
    }

    // 移除 Popover DOM
    if (this.props.visible && !nextProps.visible) {
      // 监听运动结束后删除
      this.popoverWebkitTransitionEndHandler = addEventListener(this.popoverRef, 'webkitTransitionEnd', () => {
        console.log('运动结束~~');
        this.unrenderPopover();
      });
      this.popoverMSTransitionEndHideHandler = addEventListener(this.popoverRef, 'MSTransitionEnd', () => {
        this.unrenderPopover();
      });
      this.popoverTransitionendHideHandler = addEventListener(this.popoverRef, 'transitionend', () => {
        this.unrenderPopover();
      });
    }
  }

  componentWillUnmount() {
    this.unrenderPopover();
    document.body.removeChild(this._wrapper);
  }

  /**
   * 绑定 事件
   * 
   * @param {any} ev 
   */
  onDocumentClick(ev) {
    if (this.props.overlay && !this.props.overlayClosable) {
      return;
    }
    const target = ev.target;
    const popupNode = this.popoverRef;
    if (!contains(popupNode, target)) {
      // 不是点击 popover 的内容. 关闭 popover;
      this.close(ev);
    }
  }

  /**
   * 设置 Popover 位置
   * 先插入DOM 结构, 再去设置  <<== 未插入 DOM 结构时, 无法获取尺寸信息
   */
  setPosition() {
    const position = this.getPosition();
    const style = `left: ${position.left}px; top: ${position.top}px;`;
    this.innerRef.setAttribute('style', style);

    this.popoverRef.classList.remove(`${this.props.prefixClassName}--hide`);
    this.popoverRef.classList.add(`${this.props.prefixClassName}--show`);
  }

  /**
   * 获取 Popover 位置信息
   */
  getPosition() {
    const { placement, offsetX, offsetY } = this.props;
    const $target = this.targetRef;
    const $arrow = this.arrowRef;
    const $content = this.contentRef;
    const dpr = document.querySelector('html').getAttribute('data-dpr') || 1;

    // 箭头的宽高
    const arrowWidth = $arrow ? $arrow.offsetWidth : 0;
    const arrowHeight = $arrow ? $arrow.offsetHeight : 0;
    // 内容的宽高
    const contentWidth = $content ? $content.offsetWidth : 0;
    const contentHeight = $content ? $content.offsetHeight : 0;
    // 触发目标的宽高、位置
    const targetWidth = $target.offsetWidth;
    const targetHeight = $target.offsetHeight;
    const targetTop = $target.offsetTop + (offsetY * dpr);
    const targetLeft = $target.offsetLeft + (offsetX * dpr);

    let positionTop = targetTop;
    let positionLeft = targetLeft;

    switch (placement) {
      case 'top':
        positionTop -= contentHeight + arrowHeight;
        positionLeft -= (contentWidth - targetWidth) / 2;
        break;
      case 'bottom':
        positionTop += targetHeight + arrowHeight;
        positionLeft -= (contentWidth - targetWidth) / 2;
        break;
      case 'left':
        positionTop -= (contentHeight - targetHeight) / 2;
        positionLeft -= contentWidth + arrowWidth;
        break;
      case 'right':
        positionTop -= (contentHeight - targetHeight) / 2;
        positionLeft += targetWidth + arrowWidth;
        break;
      case 'topLeft':
        positionTop -= contentHeight + arrowHeight;
        break;
      case 'topRight':
        positionTop -= contentHeight + arrowHeight;
        positionLeft -= contentWidth - targetWidth;
        break;
      case 'bottomLeft':
        positionTop += targetHeight + arrowHeight;
        break;
      case 'bottomRight':
        positionTop += targetHeight + arrowHeight;
        positionLeft -= contentWidth - targetWidth;
        break;
      default:
    }

    return {
      top: positionTop,
      left: positionLeft,
    };
  }

  /**
   * 卸载 绑定的事件
   */
  clearOutsideHandler() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }

    if (this.touchOutsideHandler) {
      this.touchOutsideHandler.remove();
      this.touchOutsideHandler = null;
    }

    // 运动相关事件
    if (this.popoverWebkitTransitionEndHandler) {
      this.popoverWebkitTransitionEndHandler.remove();
      this.popoverWebkitTransitionEndHandler = null;
    }
    if (this.popoverMSTransitionEndHideHandler) {
      this.popoverMSTransitionEndHideHandler.remove();
      this.popoverMSTransitionEndHideHandler = null;
    }
    if (this.popoverTransitionendHideHandler) {
      this.popoverTransitionendHideHandler.remove();
      this.popoverTransitionendHideHandler = null;
    }
  }

  /**
   * 遮罩层点击事件
   * 
   * @param {any} ev 
   */
  overlayClick(ev) {
    if (this.props.overlayClosable) {
      this.close(ev);
    }
  }

  /**
   * 关闭 popover
   * 
   * @param {any} ev 
   */
  close(ev) {
    this.props.close(ev);
    this.popoverRef.classList.remove(`${this.props.prefixClassName}--show`);
  }

  /**
   * 移除 Popover
   */
  unrenderPopover() {
    // 销毁
    ReactDOM.unmountComponentAtNode(this._wrapper);
    // 移除 绑定的事件
    this.clearOutsideHandler();
  }

  /**
   * 渲染 Popover
   * 
   * @param {any} props 
   */
  renderPopover(props) {
    const {
      prefixClassName, className, style, overlayStyle,
      overlay, placement, content,
    } = props;

    const popoverClasses = classNames(
      prefixClassName,
      className,
    );
    const contentClasses = classNames(
      `${prefixClassName}__content`,
      {
        [`${prefixClassName}__content--placement-left`]: placement === 'left',
        [`${prefixClassName}__content--placement-right`]: placement === 'right',
        [`${prefixClassName}__content--placement-top`]: placement === 'top',
        [`${prefixClassName}__content--placement-bottom`]: placement === 'bottom',
        [`${prefixClassName}__content--placement-topLeft`]: placement === 'topLeft',
        [`${prefixClassName}__content--placement-topRight`]: placement === 'topRight',
        [`${prefixClassName}__content--placement-bottomLeft`]: placement === 'bottomLeft',
        [`${prefixClassName}__content--placement-bottomRight`]: placement === 'bottomRight',
      },
    );

    const popover = (
      <div
        className={popoverClasses}
        style={style}
        ref={(ele) => { this.popoverRef = ele; }}
      >
        { !overlay ? null : (
          <div
            className={`${prefixClassName}__overlay`}
            style={overlayStyle}
            onClick={(ev) => { this.overlayClick(ev); }}
            ref={(ele) => { this.overlayRef = ele; }}
            role="button"
            tabIndex="-1"
          />)
        }
        <div className={contentClasses} ref={(ele) => { this.innerRef = ele; }}>
          <div className={`${prefixClassName}__arrow`} ref={(ele) => { this.arrowRef = ele; }} />
          <div className={`${prefixClassName}__inner`} ref={(ele) => { this.contentRef = ele; }}>{content}</div>
        </div>
      </div>);

    ReactDOM.render(popover, this._wrapper);

    if (!this.props.overlay) {
      // 为 document 增加 mousedown 事件监听.
      if (!this.clickOutsideHandler) {
        const currentDocument = window.document;
        this.clickOutsideHandler = addEventListener(currentDocument, 'mousedown', (ev) => {
          this.onDocumentClick(ev);
        });
      }

      // 为 document 增加 touchstart 事件监听.
      if (!this.touchOutsideHandler) {
        const currentDocument = window.document;
        this.touchOutsideHandler = addEventListener(currentDocument, 'touchstart', (ev) => {
          this.onDocumentClick(ev);
        });
      }
    }
  }

  render() {
    const children = this.props.children || null;
    return (
      React.cloneElement(children, {
        ref: (ele) => { this.targetRef = ele; },
      })
    );
  }
}

export default Popover;
