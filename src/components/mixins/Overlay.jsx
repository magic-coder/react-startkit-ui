import React from 'react';
import ReactDOM from 'react-dom';

export default class Overlay extends React.Component {
  componentDidMount() {
    // Appending to the body is easier than managing the z-index of
    // everything on the page.  It's also better for accessibility and
    // makes stacking a snap (since components will stack in mount order).
    this._layer = document.createElement('div');
    document.body.appendChild(this._layer);
    this._renderLayer();
  }

  componentDidUpdate() {
    this._renderLayer();
  }

  componentWillUnmount() {
    this._unrenderLayer();
    document.body.removeChild(this._layer);
  }

  /**
   * 渲染 遮罩层
   */
  _renderLayer() {
    console.log('run func _renderLayer...');

    // 通过在 componentDidMount() 和 componentDidUpdate() 调用此方法,
    // 创建 或者 更新 遮罩层 DOM
    const layerElement = this.renderLayer();

    if (layerElement === null) {
      ReactDOM.render(<noscript />, this._layer);
    } else {
      ReactDOM.render(layerElement, this._layer);
    }

    if (this.layerDidMount) {
      this.layerDidMount(this._layer);
    }
  }

  /**
   * 移除 遮罩层
   */
  _unrenderLayer() {
    console.log('run func _unrenderLayer...');
    if (this.layerWillUnmount) {
      this.layerWillUnmount(this._layer);
    }

    // 销毁
    ReactDOM.unmountComponentAtNode(this._layer);
  }
}
