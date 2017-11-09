import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Dialog from './Dialog';

import './scss';

export default class DialogWrap extends React.Component {
  static propTypes = {
    prefixClass: PropTypes.string,
    // 是否显示
    visible: PropTypes.bool,
  }

  static defaultProps = {
    prefixClass: 'dialog',
    visible: false,
  };

  componentDidMount() {
    if (this.props.visible) {
      this.componentDidUpdate();
    }
  }

  shouldComponentUpdate({ visible }) {
    return !!(this.props.visible || visible);
  }

  componentDidUpdate() {
    this.renderDialog(this.props.visible);
  }

  // 组件卸载的时, 保证弹层也被卸载掉
  componentWillUnmount() {
    if (this.props.visible) {
      this.renderDialog(false);
    } else {
      this.removeContainer();
    }
  }

  /**
   * 获取 弹窗组件
   * 
   * @param {any} visible 
   * @returns 
   */
  getComponent = (visible) => {
    const props = { ...this.props };

    // 删除 'visible', 'onAnimateLeave' 属性
    ['visible', 'onAnimateLeave'].forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        delete props[key];
      }
    });

    return (
      <Dialog
        {...props}
        visible={visible}
        onAnimateLeave={() => { this.removeContainer(); }}
        ref={(node) => { this.saveRef(node); }}
      />
    );
  }

  /**
   * 获取 弹窗挂在容器
   * 
   * @returns 
   */
  getContainer = () => {
    const { prefixClass } = this.props;
    let container = document.querySelector(`#${prefixClass}__container`);
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', `${prefixClass}__container`);
      document.body.appendChild(container);
    }
    return container;
  }

  saveRef = (node) => {
    this._component = node;
  }

  /**
   * 移除 弹窗相关DOM
   * 
   * @memberof DialogWrap
   */
  removeContainer() {
    ReactDOM.unmountComponentAtNode(this.container);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  /**
   * 渲染 弹窗
   * 
   * @param {any} visible 
   */
  renderDialog = (visible) => {
    this.container = this.getContainer();
    ReactDOM.render(this.getComponent(visible), this.container);
  }

  render() {
    return null;
  }
}
