import React from 'react';
import WingBlank from '@/components/wing-blank';
import WitheSpace from '@/components/white-space';
import Button from '@/components/button';
import Notification from '@/components/notification';

// import './scss/paper';

let notification = null;
Notification.newInstance({}, (instance) => { notification = instance; });


function simpleFn() {
  notification.notice({
    content: <span>默认提示信息</span>,
    onClose() {
      console.log('simple close');
    },
  });
}

function durationFn() {
  notification.notice({
    content: <span>非自动关闭</span>,
    duration: 0,
  });
}

function closableFn() {
  notification.notice({
    content: <span>带关闭按钮</span>,
    closable: true,
    duration: 0,
    onClose() {
      console.log('closable close');
    },
  });
}

function manualClose() {
  const key = Date.now();
  notification.notice({
    content: <div>
      <p>点击下方按钮关闭</p>
      <button onClick={() => { notification.removeNotice(key); }}>close</button>
    </div>,
    key,
    duration: null,
  });
}

export default class ToastExample extends React.Component {
  render() {
    return (
      <div className="page page__notification">
        <div className="page__header">
          <div className="page__title">Notification</div>
          <div className="page__desc">通知提醒信息</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">类型</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WitheSpace />
                <Button onClick={simpleFn}>基本</Button>
                <WitheSpace />
                <Button onClick={durationFn}>非自动关闭</Button>
                <WitheSpace />
                <Button onClick={closableFn}>带关闭按钮</Button>
                <WitheSpace />
                <Button onClick={manualClose}>内容控制关闭</Button>
                <WitheSpace />
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
