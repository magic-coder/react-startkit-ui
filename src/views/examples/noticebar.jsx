import React from 'react';
import WhiteSpace from '@/components/white-space';
import Icon from '@/components/icon';
import NoticeBar from '@/components/notice-bar';

// import './scss/marquee';

export default class NoticeBarExample extends React.Component {
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">NoticeBar</div>
          <div className="page__desc">通告栏</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基础</div>
            <div className="demo__preview__content">
              <NoticeBar
                className="my-notice-bar"
              >
                检查到新版本，请升级使用~
              </NoticeBar>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">链接模式</div>
            <div className="demo__preview__content">
              <NoticeBar
                className="my-notice-bar"
                mode="link"
                icon={null}
                onClick={() => {
                  const msg = '点击了链接模式~';
                  console.log(msg);
                  alert(msg);
                }}
              >
                检查到新版本，请升级使用~
              </NoticeBar>
            </div>
          </div>

          <WhiteSpace size="lg" />
          <div className="demo__preview">
            <div className="demo__preview__title">内容滚动</div>
            <div className="demo__preview__content">
              <NoticeBar className="my-notice-bar">
                超级畅销的好书特价啦，戳此看看～。这是一段超级、超级、超级、超级、超级长的促销活动。
              </NoticeBar>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">自定义 Icon</div>
            <div className="demo__preview__content">
              <NoticeBar
                className="my-notice-bar"
                icon={<Icon type="hot" size="xxs" />}
              >
                今日结束：舒适保暖，恒源祥男士纯色修身针织衫/圆领套头毛衣59元（80元券）。这是一段超级、超级、超级、超级、超级长的通知。
              </NoticeBar>
            </div>
            <WhiteSpace size="lg" />
          </div>

        </div>
      </div>
    );
  }
}
