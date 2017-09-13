import React from 'react';
import Badge from '@/components/badge';
import Icon from '@/components/icon';
import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';

import './scss/badge';

export default class BadgeExample extends React.Component {
  state = {
    show: true,
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Badge</div>
          <div className="page__desc">徽标数</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基本</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WhiteSpace size="lg" />
              <WingBlank size="lg">
                <Badge className="my-badge" text={5}>
                  <span className="head-example" />
                </Badge>
                <Badge className="my-badge" text={0} showZero>
                  <span className="head-example" />
                </Badge>
                <Badge className="my-badge" text={0}>
                  <span className="head-example" />
                </Badge>
                <WhiteSpace size="lg" />
                <p style={{ padding: '0.3rem 0 0 0', lineHeight: '1.5', fontSize: '0.28rem', opacity: '0.8' }}>
                  简单的徽章展示，当 count 为 0 时，默认不显示，但是可以使用 showZero 修改为显示。
                </p>
              </WingBlank>
              <WhiteSpace size="lg" />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">封顶数字</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WhiteSpace size="lg" />
              <WingBlank size="lg">
                <Badge className="my-badge" text={99}>
                  <span className="head-example" />
                </Badge>
                <Badge className="my-badge" text={100} showZero>
                  <span className="head-example" />
                </Badge>
                <Badge className="my-badge" text={99} overflowCount={10}>
                  <span className="head-example" />
                </Badge>
                <Badge className="my-badge" text={1000} overflowCount={999}>
                  <span className="head-example" />
                </Badge>

                <WhiteSpace size="lg" />
                <p style={{ lineHeight: '1.5', fontSize: '0.28rem', opacity: '0.8' }}>
                  超过 overflowCount 的会显示为 overflowCount +，默认的 overflowCount 为 99。
                </p>
              </WingBlank>
              <WhiteSpace size="lg" />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">可点击</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WhiteSpace size="lg" />
              <WingBlank size="lg">
                <a
                  href="javascript:;"
                  style={{ display: 'inline-block' }}
                  onClick={() => {
                    const msg = '我被点击了';
                    alert(msg);
                    console.log(msg);
                  }}
                >
                  <Badge className="my-badge" text={5}>
                    <span className="head-example" />
                  </Badge>
                </a>

                <WhiteSpace size="xl" />
                <p style={{ lineHeight: '1.5', fontSize: '0.28rem', opacity: '0.8' }}>
                  用 a 标签进行包裹即可。
                </p>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">独立使用</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WhiteSpace size="lg" />
              <WingBlank size="lg">
                <Badge className="my-badge" text={25} />
                <Badge className="my-badge" text={250} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
                <Badge className="my-badge" text={109} style={{ backgroundColor: '#87d068' }} />
                <WhiteSpace size="lg" />
                <Badge className="my-badge" text="减" hot style={{ marginRight: '0.15rem' }} />
                <Badge className="my-badge" text="惠" hot style={{ marginRight: '0.15rem' }} />
                <Badge className="my-badge" text="免" hot style={{ marginRight: '0.15rem' }} />
                <Badge className="my-badge" text="反" hot style={{ marginRight: '0.15rem' }} />
                <Badge className="my-badge" text="HOT" hot style={{ marginRight: '0.15rem' }} />
                <WhiteSpace size="lg" />
                <Badge className="my-badge" text="券" style={{ marginRight: '0.15rem', padding: '0 0.06rem', backgroundColor: '#f19736', borderRadius: 2 }} />
                <Badge className="my-badge" text="NEW" style={{ marginRight: '0.15rem', padding: '0 0.06rem', backgroundColor: '#21b68a', borderRadius: 2 }} />
                <Badge
                  className="my-badge"
                  text="自动缴费"
                  style={{
                    marginRight: '0.15rem',
                    padding: '0 0.06rem',
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    color: '#f19736',
                    border: '1px solid #f19736',
                  }}
                />
                <WhiteSpace size="xl" />
                <p style={{ lineHeight: '1.5', fontSize: '0.28rem', opacity: '0.8' }}>
                  不包裹任何元素，可自定义样式展示。
                </p>
              </WingBlank>
              <WhiteSpace size="lg" />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">恶心的小红点</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WhiteSpace size="lg" />
              <WingBlank size="lg">
                <Badge className="my-badge" dot>
                  <span className="head-example" />
                </Badge>
                <Badge className="my-badge" dot>
                  <Icon type="comments" size="md" style={{ color: '#007fff' }} />
                </Badge>
                <Badge className="my-badge" dot>
                  <a href="javascript:;">这是一个链接</a>
                </Badge>

                <WhiteSpace size="xl" />
                <p style={{ lineHeight: '1.5', fontSize: '0.28rem', opacity: '0.8' }}>
                  没有具体的数字。
                </p>
              </WingBlank>
              <WhiteSpace size="lg" />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">动态效果</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WhiteSpace size="lg" />
              <WingBlank size="lg">
                <Badge className="my-badge" dot={this.state.show}>
                  <span className="head-example" />
                </Badge>

                <a
                  href="javascript:;"
                  onClick={() => {
                    this.setState({
                      show: !this.state.show,
                    });
                  }}
                >
                  { this.state.show ? '点击隐藏' : '点击显示' }
                </a>

                <WhiteSpace size="xl" />
                <p style={{ lineHeight: '1.5', fontSize: '0.28rem', opacity: '0.8' }}>
                  展示动态变化的效果。
                </p>
              </WingBlank>
              <WhiteSpace size="lg" />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
