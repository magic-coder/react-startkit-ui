import React from 'react';
import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';
import Icon from '@/components/icon';
import Button from '@/components/button';
import Steps from '@/components/steps';

const desc = '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶';
const descVertical = '这里是多信息的描述啊描述啊描述啊描述啊哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶哦耶';

/**
 * 随机生成步骤
 */
const generateRandomSteps = () => {
  const n = Math.floor(Math.random() * 3) + 3;
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      title: `步骤${(i + 1)}`,
    });
  }
  return arr;
};

const steps = generateRandomSteps();

export default class StepsExample extends React.Component {
  state = {
    currentStep: Math.floor(Math.random() * steps.length),
  };

  nextStep() {
    let nextStepNum = this.state.currentStep + 1;
    if (nextStepNum === steps.length) {
      nextStepNum = 0;
    }
    this.setState({
      currentStep: nextStepNum,
    });
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Steps</div>
          <div className="page__desc">步骤条</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">简单</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Steps className="my-steps" direction="horizontal" current={1}>
                  <Steps.Step title="已完成" />
                  <Steps.Step title="进行中" />
                  <Steps.Step title="待运行" />
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" direction="horizontal" current={1}>
                  <Steps.Step title="已完成" description={desc} />
                  <Steps.Step title="进行中" description={desc} />
                  <Steps.Step title="待运行" description={desc} />
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" direction="horizontal" current={1} status="error">
                  <Steps.Step title="已完成" description={desc} className="my-step-custom" />
                  <Steps.Step title="进行中" description={desc} />
                  <Steps.Step title="待运行" description={desc} style={{ fontWeight: 'bold', fontStyle: 'italic' }} />
                </Steps>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">标题居中</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Steps className="my-steps" labelPlacement="vertical" direction="horizontal" current={1}>
                  <Steps.Step title="已完成" />
                  <Steps.Step title="进行中" />
                  <Steps.Step title="待运行" />
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" labelPlacement="vertical" direction="horizontal" current={1}>
                  <Steps.Step title="已完成" description={desc} />
                  <Steps.Step title="进行中" description={desc} />
                  <Steps.Step title="待运行" description={desc} />
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" labelPlacement="vertical" direction="horizontal" current={1} status="error">
                  <Steps.Step title="已完成" description={desc} />
                  <Steps.Step title="进行中" description={desc} />
                  <Steps.Step title="待运行" description={desc} />
                </Steps>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">自定义图标</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Steps className="my-steps" labelPlacement="vertical" direction="horizontal" current={1}>
                  <Steps.Step title="已完成" icon={<Icon type="message-fill" />} />
                  <Steps.Step title="进行中" icon="search" />
                  <Steps.Step title="待运行" icon="set" />
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" labelPlacement="vertical" direction="horizontal" current={1}>
                  <Steps.Step title="已完成" description={desc} icon={<Icon type="message-fill" />} />
                  <Steps.Step title="进行中" description={desc} icon="search" />
                  <Steps.Step title="待运行" description={desc} icon="set" />
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" labelPlacement="vertical" direction="horizontal" current={1} status="error">
                  <Steps.Step title="已完成" description={desc} icon={<Icon type="message-fill" />} />
                  <Steps.Step title="进行中" description={desc} icon="search" />
                  <Steps.Step title="待运行" description={desc} icon="set" />
                </Steps>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">下一步操作</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <div>
                  <p>随机生成3~5个步骤，初始随机进行到其中一个步骤</p>
                  <WhiteSpace />
                  <p>当前正在执行第{this.state.currentStep + 1}步</p>
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" labelPlacement="vertical" direction="horizontal" current={this.state.currentStep}>
                  {
                    steps.map((stepItem, index) => {
                      const key = `key-${index}`;
                      return (
                        <Steps.Step title={stepItem.title} key={key} />
                      );
                    })
                  }
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button htmlType="button" onClick={() => { this.nextStep(); }}>下一步</Button>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">垂直布局</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Steps className="my-steps" current={1}>
                  <Steps.Step title="已完成" description={descVertical} />
                  <Steps.Step title="进行中" description={descVertical} />
                  <Steps.Step title="待运行" description={desc} />
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" current={1} status="error">
                  <Steps.Step title="已完成" description={desc} className="my-step-custom" />
                  <Steps.Step title="进行中" description={descVertical} />
                  <Steps.Step title="待运行" description={desc} />
                </Steps>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">尺寸</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Steps className="my-steps" size="small" current={1}>
                  <Steps.Step title="已完成" description={desc} className="my-step-custom" />
                  <Steps.Step title="进行中" description={descVertical} />
                  <Steps.Step title="待运行" description={desc} />
                </Steps>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Steps className="my-steps" size="large" current={1}>
                  <Steps.Step title="已完成" description={desc} className="my-step-custom" />
                  <Steps.Step title="进行中" description={descVertical} />
                  <Steps.Step title="待运行" description={desc} />
                </Steps>
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
