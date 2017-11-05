import React from 'react';
import WhiteSpace from '@/components/white-space';
import WingBlank from '@/components/wing-blank';
import Button from '@/components/button';
import Progress from '@/components/progress';

import './scss/progress';

export default class ProgressExample extends React.Component {
  state = {
    linePercent: 0,
    circlePercent: 0,
  }

  increase = (type) => {
    if (type === 'line') {
      let percent = this.state.linePercent + 10;
      if (percent > 100) {
        percent = 100;
      }
      this.setState({
        linePercent: percent,
      });
    } else if (type === 'circle') {
      let percent = this.state.circlePercent + 10;
      if (percent > 100) {
        percent = 100;
      }
      this.setState({
        circlePercent: percent,
      });
    }
  }

  decline = (type) => {
    if (type === 'line') {
      let percent = this.state.linePercent - 10;
      if (percent < 0) {
        percent = 0;
      }

      this.setState({
        linePercent: percent,
      });
    } else if (type === 'circle') {
      let percent = this.state.circlePercent - 10;
      if (percent < 0) {
        percent = 0;
      }
      this.setState({
        circlePercent: percent,
      });
    }
  }

  render() {
    return (
      <div className="page page__progress">
        <div className="page__header">
          <div className="page__title">Progress</div>
          <div className="page__desc">进度条</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">进度条</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Progress percent={30} />
                <WhiteSpace size="lg" />
                <Progress percent={50} status="active" />
                <WhiteSpace size="lg" />
                <Progress percent={70} status="exception" />
                <WhiteSpace size="lg" />
                <Progress percent={100} />
                <WhiteSpace size="lg" />
                <Progress percent={50} showInfo={false} />
                <WhiteSpace size="lg" />
                <Progress percent={50} appearTransition />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">小型进度条</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Progress percent={30} strokeWidth={4} />
                <WhiteSpace size="lg" />
                <Progress percent={50} strokeWidth={4} status="active" />
                <WhiteSpace size="lg" />
                <Progress percent={70} strokeWidth={4} status="exception" />
                <WhiteSpace size="lg" />
                <Progress percent={100} strokeWidth={4} />
                <WhiteSpace size="lg" />
                <Progress percent={50} strokeWidth={4} showInfo={false} />
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">进度条状态展示</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace />
                <Progress percent={this.state.linePercent} />
                <WhiteSpace />
                <div>
                  <Button onClick={() => { this.decline('line'); }}>减少</Button>
                  <Button onClick={() => { this.increase('line'); }}>增加</Button>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">进度圈</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Progress type="circle" percent={75} />
                <Progress type="circle" percent={70} status="exception" />
                <Progress type="circle" percent={100} />
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">小型进度圈</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Progress type="circle" percent={75} width={80} />
                <Progress type="circle" percent={70} width={80} status="exception" />
                <Progress type="circle" percent={100} width={80} />
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">自定义文字格式</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Progress type="circle" percent={75} format={(percent) => { return `${percent} Days`; }} />
                <Progress type="circle" percent={100} format={() => { return 'Done'; }} />
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">进度圈状态展示</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <Progress type="circle" percent={this.state.circlePercent} />
                <WhiteSpace />
                <div>
                  <Button onClick={() => { this.decline('circle'); }}>减少</Button>
                  <Button onClick={() => { this.increase('circle'); }}>增加</Button>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
