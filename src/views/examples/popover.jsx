import React from 'react';
import Popover from '@/components/popover';
import Divider from '@/components/divider';

export default class PopverExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      position: {},
    };
  }
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Popover</div>
          <div className="page__desc">气泡菜单</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基本</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <button
                style={{ marginLeft: '3rem' }}
                onClick={(ev) => {
                  ev.stopPropagation();

                  const $target = ev.target;

                  this.setState({
                    visible: !this.state.visible,
                    position: {
                      x: $target.offsetLeft,
                      y: $target.offsetTop + $target.offsetHeight,
                    },
                  });
                }}
              >显示/隐藏</button>
              <Popover
                className="my-popover"
                visible={this.state.visible}
                position={this.state.position}
                placement="bottomRight"
                overlay
                overlayClick={(ev) => {
                  ev.stopPropagation();
                  console.log('触发 overlayClick 事件');
                  this.setState({
                    visible: false,
                  });
                }}
                close={(ev) => {
                  ev.stopPropagation();
                  console.log('触发 close 事件');
                  this.setState({
                    visible: false,
                  });
                }}
              >
                <p style={{ padding: '0.20rem 0.30rem' }}>历史记录</p>
                <Divider />
                <p style={{ padding: '0.20rem 0.30rem' }}>分享到</p>
                <Divider />
                <p style={{ padding: '0.20rem 0.30rem' }}>设置</p>
              </Popover>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
