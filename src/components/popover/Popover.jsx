import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import addEventListener from '@/utils/Dom/addEventListener';
import contains from '@/utils/Dom/contains';

// import { Overlay } from '../mixins';

import './scss';

class Popover extends React.Component {
  static propTypes = {
    // prefixClassName: PropTypes.string,
    // className: PropTypes.oneOfType([
    //   PropTypes.string,
    //   PropTypes.object,
    // ]),
    // style: PropTypes.object,
    // children: PropTypes.any,
    // 是否显示
    visible: PropTypes.bool,
    // 是否有遮罩层
    overlay: PropTypes.bool,
    // 是否有遮罩层点击回调函数
    overlayClosable: PropTypes.bool,
    // 遮罩层点击回调函数
    overlayClick: PropTypes.func,
    close: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'popover',
    visible: false,
    position: {
      x: 0,
      y: 0,
    },
    placement: 'bottomRight', // 'left','right','top','bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
    overlay: false,
    overlayClosable: true,
    overlayClick: () => {},
    close: () => {},
  }

  componentWillMount() {
    // 创建装载的空 div
    this._wrapper = document.createElement('div');
    document.body.appendChild(this._wrapper);

    if (this.props.visible) {
      this.renderPopover(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // 创建 Popover DOM
    if (nextProps.visible && !this.props.visible) {
      this.renderPopover(nextProps);
    }

    // 移除 Popover DOM
    if (this.props.visible && !nextProps.visible) {
      this.unrenderPopover();
    }
  }

  componentWillUnmount() {
    this.unrenderPopover();
    document.body.removeChild(this._wrapper);
  }

  /**
   * 绑定 事件
   * 
   * @returns 
   */
  onDocumentClick(ev) {
    if (this.props.overlay && !this.props.overlayClosable) {
      return;
    }
    const target = ev.target;
    const popupNode = this.popoverRef;
    if (!contains(popupNode, target)) {
      // 不是点击 popover 的内容. 关闭 popover;
      this.props.close(ev);
    }
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
  }

  /**
   * 遮罩层点击事件
   * 
   * @memberof Popover
   */
  overlayClick(ev) {
    if (this.props.overlayClosable) {
      this.props.overlayClick(ev);
    }
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
   * @memberof Popover
   */
  renderPopover(props) {
    const {
      prefixClassName, className, style, overlayStyle, contentStyle, children,
      overlay, position, placement,
    } = props;

    const popoverClasses = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--placement-bottomRight`]: placement === 'bottomRight',
      },
    );
    const popoverContentStyle = Object.assign({}, contentStyle, {
      left: position.x,
      top: position.y,
    });

    const popover = (
      <div
        style={style}
        ref={(ele) => { this.popoverRef = ele; }}
      >
        { !overlay ? null : (
          <div
            className={`${prefixClassName}__overlay`}
            style={overlayStyle}
            onClick={(ev) => { this.overlayClick(ev); }}
            role="button"
            tabIndex="-1"
          />)
        }
        <div className={popoverClasses} style={popoverContentStyle}>
          {children}
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
    return (
      null
    );
  }
}

export default Popover;
