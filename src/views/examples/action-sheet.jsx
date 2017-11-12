import React from 'react';

import Button from '@/components/button';
import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';
import Toast from '@/components/toast';
import Icon from '@/components/icon';
import ActionSheet from '@/components/action-sheet';

import thumb from '@/assets/images/thumb3.png';

export default class ActionSheetExample extends React.Component {
  showNormal = () => {
    ActionSheet.showNormal({
      className: 'my__action-sheet--normal',
      title: '常规动作面板',
      message: '这是一段描述内容，描述内容描述内容描述内容',
      options: [
        { name: 'Operation1' },
        { name: 'Operation2' },
        { name: 'Operation3' },
        { name: 'Delete' },
      ],
      callback: (buttonIndex) => {
        console.log('click button index =>> ', buttonIndex);
      },
    });
  }

  showNormal2 = (layout = 'list', listAlign = 'center') => {
    ActionSheet.showNormal({
      className: 'my__action-sheet--normal',
      layout,
      listAlign,
      title: '常规面板',
      message: '这是一段描述内容，描述内容描述内容描述内容',
      options: [
        { name: 'Operation1', thumb },
        { name: 'Operation2', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
        { name: 'Operation3', thumb: <Icon type="message" /> },
        { name: 'Shopping Cart', thumb: <Icon type="cart" /> },
      ],
      callback: (buttonIndex) => {
        console.log('click button index =>> ', buttonIndex);
      },
    });
  }

  showNormal3 = (layout = 'list', columnNum = 4) => {
    ActionSheet.showNormal({
      className: 'my__action-sheet--normal',
      layout,
      columnNum,
      title: '分享',
      options: [
        { name: 'Gmail', thumb },
        { name: 'Hangout', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
        { name: 'Google+', thumb: <Icon type="message" /> },
        { name: 'Message', thumb: <Icon type="cart" /> },
        { name: 'More', thumb: <Icon type="ellipsis" /> },
      ],
      callback: (buttonIndex) => {
        console.log('click button index =>> ', buttonIndex);
      },
    });
  }

  showShare = (row = 1) => {
    const options = [
      {
        list: [
          { name: '发给朋友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/OpHiXAcYzmPQHcdlLFrc.png' },
          { name: '新浪微博', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/wvEzCMiDZjthhAOcwTOu.png' },
          { name: '生活圈', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
          { name: '微信好友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png' },
          { name: 'QQ好友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/SxpunpETIwdxNjcJamwB.png' },
        ],
      },
    ];

    if (row === 2) {
      options[0].list.push(
        { name: '生活圈', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
        { name: '微信好友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png' },
      );
      options.push({
        list: [
          { name: '生活圈', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
          { name: '微信好友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png' },
        ],
      });
    }

    console.log(row, options);

    ActionSheet.showShare({
      className: 'my__action-sheet--share',
      options,
      callback: (buttonIndex, rowIndex) => {
        console.log(`click button index: ${buttonIndex}`, `, row index: ${rowIndex}`);
      },
    });
  }

  showShare2 = () => {
    const options = [
      {
        title: '分享到支付宝:',
        list: [
          { name: '发给朋友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/OpHiXAcYzmPQHcdlLFrc.png' },
          { name: '生活圈', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
        ],
      },
      {
        title: '分享到站外:',
        list: [
          { name: '朋友圈', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
          { name: '微信好友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png' },
          { name: '新浪微博', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/wvEzCMiDZjthhAOcwTOu.png' },
          { name: '微信好友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png' },
          { name: '生活圈', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
          { name: '微信好友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png' },
          { name: '朋友圈', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png' },
          { name: '微信好友', thumb: 'https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png' },
        ],
      },
    ];

    ActionSheet.showShare({
      className: 'my__action-sheet--share',
      title: '',
      options,
      callback: (buttonIndex, rowIndex) => {
        console.log(`click button index: ${buttonIndex}`, `, row index: ${rowIndex}`);
      },
    });
  }

  showCustom = () => {
    const actionSheetCustom = ActionSheet.showCustom({
      className: 'my__action-sheet--custom',
      title: '发现新版本',
      cancelButtonRemove: true,
      content: (
        <div className="text__content">
          <p style={{ marginBottom: '0.15rem' }}>双11，国货就是硬！11月1日开启特惠</p>
          <p style={{ marginBottom: '0.15rem' }}>新增 “我的页面”快递查看物流信息</p>
          <p style={{ marginBottom: '0.15rem' }}>新增 商城早报支持留言功能</p>
          <p style={{ marginBottom: '0.15rem' }}>优化 一些细节体验</p>
          <p style={{ marginTop: '0.5rem' }}>
            <Button
              fullWidth
              size="large"
              type="secondary"
              onClick={() => {
                console.log('Downloading background');
                actionSheetCustom.close();
                Toast.info({
                  content: 'Downloading background',
                  duration: 2000,
                  transitionName: 'fadeBounce',
                });
              }}
            >立即更新</Button>
          </p>
        </div>
      ),
    });
  }

  render() {
    return (
      <div className="page page__action-sheet">
        <div className="page__header">
          <div className="page__title">ActionSheet</div>
          <div className="page__desc">动作面板</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">动作按钮</div>
            <div className="demo__preview__content">
              <WingBlank>
                <Button fullWidth size="large" onClick={this.showNormal}>默认</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showNormal2('list'); }}>有图标</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showNormal2('list', 'left'); }}>内容左对齐</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showNormal3('grid'); }}>网格</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showNormal3('grid', 3); }}>网格 - 三列</Button>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">分享</div>
            <div className="demo__preview__content">
              <WingBlank>
                <Button fullWidth size="large" onClick={() => { this.showShare(1); }}>一列</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showShare(2); }}>多列</Button>
                <WhiteSpace />
                <Button fullWidth size="large" onClick={() => { this.showShare2(); }}>标题说明</Button>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">自定义</div>
            <div className="demo__preview__content">
              <WingBlank>
                <Button fullWidth size="large" onClick={this.showCustom}>自定义内容</Button>
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
