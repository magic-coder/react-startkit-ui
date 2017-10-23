import React from 'react';
import WingBlank from '@/components/wing-blank';
import WitheSpace from '@/components/white-space';
import Button from '@/components/button';
import Icon from '@/components/icon';
import Toast from '@/components/toast';

// 位置
function showToastCenter() {
  Toast.info({
    content: 'This is a toast tips !!!',
  });
}
function showToastBottom() {
  Toast.info({
    content: 'This is a toast tips on bottom!!!',
    position: 'bottom',
    duration: 3000,
  });
}
function showToastBottomMulti() {
  Toast.info({
    content: (<span style={{ textAlign: 'left', display: 'inline-block' }}>检测到您的帐号密码过于简单，请重新设置密码。否则，将会影响到某些功能的使用</span>),
    position: 'bottom',
    duration: 3000,
  });
}


// 类型
function showToastInfo() {
  Toast.info({
    content: '信息提示 Toast',
    position: 'bottom',
    transitionName: 'fadeBounce',
  });
}
function showToastSuccess() {
  Toast.success({
    content: '加载成功',
    duration: 0,
  });
}
function showToastFail() {
  Toast.fail({
    content: '加载失败',
  });
}
function showToastOffline() {
  Toast.offline({
    content: '网络异常',
  });
}
function showToastLoading() {
  Toast.loading({
    content: '正在加载',
  });
}
function showToastCustom() {
  Toast.custom({
    icon: <Icon type="warning" size="lg" />,
    content: '自定义图标',
  });
}
function showToastCustomOnlyIcon() {
  Toast.custom({
    className: 'custom-toast--only-icon',
    icon: <Icon type="loading" size="md" />,
    overlay: true,
    overlayOpacity: true,
    duration: 0,
  });

  // 5 秒后删除
  setTimeout(() => {
    Toast.hide();
  }, 5000);
}

// 移动效果
function animateEffect(options) {
  Toast.info(options);
}

export default class ToastExample extends React.Component {
  render() {
    return (
      <div className="page page__toast">
        <div className="page__header">
          <div className="page__title">Toast</div>
          <div className="page__desc">轻提示弹窗</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">位置</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WitheSpace />
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastCenter}>居中</Button>
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastBottom}>底部</Button>
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastBottomMulti}>底部 - 多行</Button>
                <WitheSpace />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">类型</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WitheSpace />
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastInfo}>信息</Button>
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastSuccess}>成功</Button>
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastFail}>失败</Button>
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastOffline}>断网</Button>
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastLoading}>加载中</Button>
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastCustom}>自定义</Button>
                <Button style={{ margin: '0.2rem 0.1rem' }} onClick={showToastCustomOnlyIcon}>自定义 - 图标</Button>
                <WitheSpace />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">显示效果</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WitheSpace />
                <Button
                  style={{ margin: '0.2rem 0.1rem' }}
                  onClick={() => {
                    animateEffect({
                      content: '密码不能为空',
                      position: 'center',
                      transitionName: 'fade',
                      duration: 0,
                    });
                  }}
                >居中:渐隐</Button>
                <Button
                  style={{ margin: '0.2rem 0.1rem' }}
                  onClick={() => {
                    animateEffect({
                      content: '密码不能为空',
                      position: 'center',
                      transitionName: 'fadeBounce',
                      duration: 0,
                    });
                  }}
                >居中:渐隐 + 弹性</Button>
                <WitheSpace />
                <Button
                  style={{ margin: '0.2rem 0.1rem' }}
                  onClick={() => {
                    animateEffect({
                      content: '密码不能为空',
                      position: 'bottom',
                      transitionName: 'fade',
                      duration: 0,
                    });
                  }}
                >底部:渐隐</Button>
                <Button
                  style={{ margin: '0.2rem 0.1rem' }}
                  onClick={() => {
                    animateEffect({
                      content: '密码不能为空',
                      position: 'bottom',
                      mask: true,
                      transitionName: 'fadeBounce',
                      duration: 0,
                    });
                  }}
                >底部:渐隐 + 弹性</Button>
                <WitheSpace />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">遮罩层</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WitheSpace />
                <Button
                  style={{ margin: '0.2rem 0.1rem' }}
                  onClick={() => {
                    Toast.info({
                      content: '没有遮罩层的 Toast',
                      position: 'bottom',
                      transitionName: 'fadeBounce',
                      overlay: false,
                    });
                  }}
                >没有</Button>
                <Button
                  style={{ margin: '0.2rem 0.1rem' }}
                  onClick={() => {
                    Toast.info({
                      content: '透明遮罩层的 Toast',
                      position: 'bottom',
                      transitionName: 'fadeBounce',
                      overlay: true,
                    });
                  }}
                >透明</Button>
                <Button
                  style={{ margin: '0.2rem 0.1rem' }}
                  onClick={() => {
                    Toast.info({
                      content: '半透明遮罩层的 Toast',
                      position: 'bottom',
                      transitionName: 'fadeBounce',
                      overlay: true,
                      overlayOpacity: true,
                    });
                  }}
                >半透明</Button>
                <WitheSpace />
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
