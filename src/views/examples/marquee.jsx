import React from 'react';
import WhiteSpace from '@/components/white-space';
import Marquee from '@/components/marquee';

import './scss/marquee';

export default class MarqueeExample extends React.Component {
  render() {
    return (
      <div className="page page__marquee">
        <div className="page__header">
          <div className="page__title">Marquee</div>
          <div className="page__desc">跑马灯</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">内容未超出</div>
            <div className="demo__preview__content">
              <div className="my-notice-bar">
                <Marquee className="my-marquee">检查到新版本，请升级使用~</Marquee>
              </div>
            </div>
          </div>

          <WhiteSpace size="lg" />
          <div className="demo__preview">
            <div className="demo__preview__title">滚动一次</div>
            <div className="demo__preview__content">
              <div className="my-notice-bar">
                <Marquee className="my-marquee">超级畅销的好书特价啦，戳此看看～。这是一段超级、超级、超级、超级、超级长的促销活动。</Marquee>
              </div>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">循环滚动</div>
            <div className="demo__preview__content">
              <div className="my-notice-bar">
                <Marquee className="my-marquee" loop>今日结束：舒适保暖，恒源祥男士纯色修身针织衫/圆领套头毛衣59元（80元券）。这是一段超级、超级、超级、超级、超级长的通知。</Marquee>
              </div>
            </div>
            <WhiteSpace size="lg" />
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">循环 + 鼠标经停</div>
            <div className="demo__preview__content">
              <div className="my-notice-bar">
                <Marquee className="my-marquee" loop hoverToStop>今日结束：舒适保暖，恒源祥男士纯色修身针织衫/圆领套头毛衣59元（80元券）。这是一段超级、超级、超级、超级、超级长的通知。</Marquee>
              </div>
            </div>
            <WhiteSpace size="lg" />
          </div>

        </div>
      </div>
    );
  }
}
