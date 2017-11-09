import React from 'react';

import Button from '@/components/button';
import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';
import Dialog from '@/components/dialog';

import './scss/doalog';

export default class DialogExample extends React.Component {
  state = {
    visible: false,
    visibleAll: false,
    visibleCallback: false,
  };

  onClose = (key) => {
    this.setState({
      [key]: false,
    });
  }

  showDialog = (key) => {
    this.setState({
      [key]: true,
    });
  }

  render() {
    const dialog = (
      <Dialog
        wrapClassName="my-dialog-wrap"
        className="my-dialog"
        style={{
          width: '80%',
        }}
        visible={this.state.visible}
        animation="zoom"
        maskAnimation="fade"
        onClose={() => { this.onClose('visible'); }}
        onMaskClick={this.onClose}
        center
      >
        <input />
        <p>basic modal</p>
        <div style={{ height: 200 }} />
      </Dialog>
    );

    const dialogAll = (
      <Dialog
        style={{
          width: '80%',
        }}
        visible={this.state.visibleAll}
        animation="zoom"
        maskAnimation="fade"
        onClose={() => { this.onClose('visibleAll'); }}
        onMaskClick={this.onCloseAll}
        center
        title="提示"
        footer={<div style={{ cursor: 'pointer' }} role="button" tabIndex="-1" onClick={() => { this.onClose('visibleAll'); }}>取消</div>}
      >
        <input />
        <p>basic modal</p>
        <div style={{ height: 150 }} />
      </Dialog>
    );

    const dialogCallback = (
      <Dialog
        style={{
          width: '80%',
        }}
        visible={this.state.visibleCallback}
        animation="zoom"
        maskAnimation="fade"
        onClose={() => { this.onClose('visibleCallback'); }}
        onMaskClick={this.onCloseCallback}
        center
        title="回调函数弹窗"
        footer={<div style={{ cursor: 'pointer' }} role="button" tabIndex="-1" onClick={() => { this.onClose('visibleCallback'); }}>取消</div>}
        afterClose={() => {
          console.log('afterClose callback...');
        }}
      >
        <input />
        <p>basic modal</p>
        <div style={{ height: 150 }} />
      </Dialog>
    );

    return (
      <div className="page page__dialog">
        <div className="page__header">
          <div className="page__title">Dialog</div>
          <div className="page__desc">弹窗</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基础</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace />
                {dialog}
                <Button onClick={() => { this.showDialog('visible'); }}>默认</Button>
                {dialogAll}
                <Button onClick={() => { this.showDialog('visibleAll'); }}>标题&底部</Button>
                <WhiteSpace />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">回调函数</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace />
                {dialogCallback}
                <Button onClick={() => { this.showDialog('visibleCallback'); }}>回调</Button>
                <WhiteSpace />
              </WingBlank>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
