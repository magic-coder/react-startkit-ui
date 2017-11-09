import React from 'react';

import Button from '@/components/button';
import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';
import Toast from '@/components/toast';
import Modal from '@/components/modal';

import resultWarning from '@/assets/images/result-warning.png';

import './scss/modal';

const CustomMessage = () => {
  return (
    <div className="result" role="alert">
      <div className="result__image">
        <img src={resultWarning} className="result__icon" alt="" />
      </div>
      <div className="result__title">无法完成操作</div>
      <div className="result__message">由于你的支付宝账户还未绑定淘宝账户请登录www.taobao.com</div>
    </div>
  );
};

export default class ModalExample extends React.Component {
  state = {
    modal1: false,
  };

  onClose = (key) => {
    this.setState({
      [key]: false,
    });
  }

  showModal = (key) => {
    console.log('show modal =>>', [key]);
    this.setState({
      [key]: true,
    });
  }

  showAlert = (platform = 'auto') => {
    Modal.alert({
      message: '用户名不能为空',
      platform,
    });
  }

  showAlert2 = () => {
    Modal.alert({
      title: '温馨提示',
      message: '您的余额不足~',
      actions: [{
        text: 'OK',
        style: 'default',
        onPress: () => { console.log('OK...'); },
      }],
    });
  }

  showAlert3 = () => {
    Modal.alert({
      title: '',
      className: 'modal__custom',
      message: <CustomMessage />,
      actions: [{
        text: '确定',
        onPress: () => { console.log('确定'); },
      }],
    });
  }

  showConfirm = (platform = 'auto') => {
    Modal.alert({
      title: '删除',
      message: '您确定要删除吗？',
      platform,
      actions: [
        {
          text: '取消',
          onPress: () => { console.log('click cancel'); },
        },
        {
          text: '确定',
          onPress: () => { console.log('click ok'); },
        },
      ],
    });
  }

  showConfirm2 = () => {
    Modal.alert({
      title: '发现新版本',
      message: '修复低版本安卓手机点透以及无法居中显示问题；去除CSS3启用GPU硬件加速',
      actions: [
        {
          text: '不再提醒',
          onPress: () => {
            console.log('第0个按钮被点击了');
          },
        },
        {
          text: '下次再说',
          onPress: () => {
            console.log('第1个按钮被点击了');
          },
        },
        {
          text: '现在升级',
          onPress: () => {
            console.log('第2个按钮被点击了');
          },
        },
      ],
    });
  }

  showConfirm3 = () => {
    Modal.alert({
      title: 'Delete',
      message: 'Are you sure???',
      actions: [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: 'Ok',
          onPress: () => {
            const promise = new Promise((resolve) => {
              Toast.info({
                content: 'onPress Promise',
                duration: 2000,
              });
              setTimeout(resolve, 2000);
            });

            return promise;
          },
        },
      ],
    });
  }

  showConfirm4 = () => {
    Modal.alert({
      title: '删除',
      message: '您确定要删除吗？',
      actions: [
        {
          text: '取消',
          onPress: () => { console.log('click cancel'); },
        },
        {
          className: 'my-custom-button',
          style: {
            color: '#f30',
          },
          text: '确定',
          onPress: () => { console.log('click ok'); },
        },
      ],
    });
  }

  showConfirm5 = () => {
    Modal.alert({
      title: '',
      className: 'modal__custom',
      message: <CustomMessage />,
      actions: [
        {
          text: '取消',
          onPress: () => { console.log('click cancel'); },
        },
        {
          text: '确定',
          onPress: () => { console.log('click ok'); },
        },
      ],
    });
  }

  showPrompt = () => {
    Modal.prompt({
      title: '登录用户',
      message: '请输入您的用户名',
      type: 'default',
      placeholders: ['用户名'],
      callbackOrActions: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          onPress: (value) => {
            console.log('your user name: ', value);
          },
        },
      ],
    });
  }

  showPrompt2 = () => {
    Modal.prompt({
      title: '登录用户',
      message: '请输入您的用户名',
      type: 'default',
      placeholders: ['用户名'],
      callbackOrActions: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          onPress: (value) => {
            return new Promise((resolve) => {
              Toast.info({
                content: 'onPress Promise',
                duration: 2000,
              });

              setTimeout(() => {
                resolve();
                console.log('your user name: ', value);
              }, 2000);
            });
          },
        },
      ],
    });
  }

  showPrompt3 = () => {
    Modal.prompt({
      title: '登录用户',
      message: '请输入您的用户名',
      defaultValue: '张三疯',
      placeholders: ['用户名'],
      callbackOrActions: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          onPress: (value) => {
            console.log('your user name: ', value);
          },
        },
      ],
    });
  }

  showPrompt4 = () => {
    Modal.prompt({
      title: '密码',
      message: '确认支付密码',
      type: 'secure-text',
      placeholders: ['请输入您的密码'],
      callbackOrActions: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          onPress: (value) => {
            console.log('your password: ', value);
          },
        },
      ],
    });
  }

  showPrompt5 = () => {
    Modal.prompt({
      title: '登录',
      message: '输入登录帐号和密码',
      type: 'login-password',
      placeholders: ['用户名', '密码'],
      callbackOrActions: [
        {
          text: 'Cancel',
        },
        {
          text: 'Submit',
          onPress: (name, password) => {
            console.log('your name: ', name);
            console.log('your password: ', password);
          },
        },
      ],
    });
  }

  showPrompt6 = () => {
    Modal.prompt({
      title: '自定义',
      message: '自定义按钮的文案',
      callbackOrActions: [
        {
          text: '取消',
        },
        {
          text: '提交',
          style: {
            color: '#f30',
          },
          onPress: (value) => {
            console.log('your value: ', value);
          },
        },
      ],
    });
  }

  render() {
    return (
      <div className="page page__modal">
        <div className="page__header">
          <div className="page__title">Modal</div>
          <div className="page__desc">模态对话框</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基础</div>
            <div className="demo__preview__content">
              <WingBlank>
                <Modal
                  visible={this.state.modal1}
                  title="默认"
                  maskClosable={false}
                  onClose={() => { this.onClose('modal1'); }}
                  footer={
                    [{
                      text: '确定',
                      onPress: () => {
                        console.log('ok');
                        this.onClose('modal1');
                      },
                    }]
                  }
                >
                  <div className="text__content" style={{ height: 200, overflowY: 'scroll' }}>
                    <p>{'PostCSS 是使用 JS 插件来转换 CSS 的工具，支持变量、混入、未来 CSS 语法、内联图像等等。PostCSS 已经被许多大公司使用，包括维基百科、Twitter、阿里巴巴和 JetBrains 。'}</p>
                    <p>PostCSS 6.0 占用更少内存，移除了对 Node.js 0.12 的支持，清理了 raws API，并添加了对 @apply 支持。</p>
                  </div>
                </Modal>
                <Button
                  fullWidth
                  size="large"
                  onClick={() => {
                    this.showModal('modal1');
                  }}
                >默认</Button>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">警告/对话弹窗</div>
            <div className="demo__preview__content">
              <WingBlank>
                <Button fullWidth size="large" onClick={this.showAlert}>警告/对话框</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showAlert2}>自定义</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showAlert3}>自定义内容</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showAlert('ios'); }}>IOS 样式</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showAlert('android'); }}>Android 样式</Button>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">确认弹窗</div>
            <div className="demo__preview__content">
              <WingBlank>
                <Button fullWidth size="large" onClick={this.showConfirm}>确认框</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showConfirm2}>多个按钮</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showConfirm3}>Promise 异步</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showConfirm4}>自定义按钮样式</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showConfirm5}>自定义内容</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showConfirm('ios'); }}>IOS 样式</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showConfirm('android'); }}>Android 样式</Button>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">输入弹窗</div>
            <div className="demo__preview__content">
              <WingBlank>
                <Button fullWidth size="large" onClick={this.showPrompt}>输入弹窗</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showPrompt2}>Promise 异步</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showPrompt3}>默认值</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showPrompt4}>secure-text</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showPrompt5}>login-password</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={this.showPrompt6}>自定义按钮样式</Button>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">操作弹窗</div>
            <div className="demo__preview__content">
              <WingBlank>
                <Button
                  fullWidth
                  size="large"
                  onClick={() => {
                    Modal.operation({
                      actions: [
                        {
                          text: '删除该聊天',
                          onPress: () => { console.log('删除该聊天被点击了'); },
                          className: 'modal-operation-del',
                        },
                      ],
                    });
                  }}
                >单个按钮</Button>
                <WhiteSpace />
                <Button
                  fullWidth
                  size="large"
                  onClick={() => {
                    Modal.operation({
                      actions: [
                        { text: '置顶聊天', onPress: () => { console.log('置顶聊天被点击了'); } },
                        { text: '删除该聊天', onPress: () => { console.log('删除该聊天被点击了'); } },
                      ],
                    });
                  }}
                >两个按钮</Button>
                <WhiteSpace />
                <Button
                  fullWidth
                  size="large"
                  onClick={() => {
                    Modal.operation({
                      actions: [
                        { text: '标为未读', onPress: () => { console.log('标为未读被点击了'); } },
                        {
                          text: '置顶聊天',
                          style: {
                            color: '#f30',
                          },
                          className: 'modal-operation-set-top',
                          onPress: () => { console.log('置顶聊天被点击了'); } },
                        { text: '删除该聊天', onPress: () => { console.log('删除该聊天被点击了'); } },
                      ],
                    });
                  }}
                >多个按钮</Button>
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
