import React from 'react';

import Accordion from '@/components/accordion';

import './scss/accordion';

class AccordionExample extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  onChange = (key) => {
    console.log(key);
  }

  onChangeAccordion = (key) => {
    console.log(key);
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Accordion</div>
          <div className="page__desc">手风琴</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基本</div>
            <div className="demo__preview__content">
              <Accordion
                onChange={this.onChange}
              >
                <Accordion.Item
                  label="评价是怎么来的？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>爱彼迎上的所有评价均由爱彼迎房东和旅行者所撰写。因此，您看到的评价都是基于房客在房东房源内完成的某次住宿。</p>
                    <p>退房后您有14天的时间为旅程撰写评价。</p>
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  label="预订的价格是如何计算的？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>爱彼迎上的预订总价取决于好几个因素。请注意，房东一旦接受您的预订申请（或者如果您使用闪订功能预订住宿），系统便会按此价格全额收取费用。</p>
                    <p>有些房东为支付其房源的清洁费用而收取的一次性费用额外房客费：有些房东为支付与使用他们的房源有关的其他费用而收取的一次性费用</p>
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  label="如何取消我的预订？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                    <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">基本 - 默认展开第二个</div>
            <div className="demo__preview__content">
              <Accordion
                defaultActiveIndex={1}
              >
                <Accordion.Item
                  label="评价是怎么来的？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>爱彼迎上的所有评价均由爱彼迎房东和旅行者所撰写。因此，您看到的评价都是基于房客在房东房源内完成的某次住宿。</p>
                    <p>退房后您有14天的时间为旅程撰写评价。</p>
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  label="预订的价格是如何计算的？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>爱彼迎上的预订总价取决于好几个因素。请注意，房东一旦接受您的预订申请（或者如果您使用闪订功能预订住宿），系统便会按此价格全额收取费用。</p>
                    <p>有些房东为支付其房源的清洁费用而收取的一次性费用额外房客费：有些房东为支付与使用他们的房源有关的其他费用而收取的一次性费用</p>
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  label="如何取消我的预订？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                    <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">手风琴模式</div>
            <div className="demo__preview__content">
              <Accordion
                accordion
                onChange={this.onChangeAccordion}
              >
                <Accordion.Item
                  label="评价是怎么来的？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>爱彼迎上的所有评价均由爱彼迎房东和旅行者所撰写。因此，您看到的评价都是基于房客在房东房源内完成的某次住宿。</p>
                    <p>退房后您有14天的时间为旅程撰写评价。</p>
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  label="预订的价格是如何计算的？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>爱彼迎上的预订总价取决于好几个因素。请注意，房东一旦接受您的预订申请（或者如果您使用闪订功能预订住宿），系统便会按此价格全额收取费用。</p>
                    <p>有些房东为支付其房源的清洁费用而收取的一次性费用额外房客费：有些房东为支付与使用他们的房源有关的其他费用而收取的一次性费用</p>
                  </div>
                </Accordion.Item>
                <Accordion.Item
                  label="如何取消我的预订？"
                >
                  <div className="text__content" style={{ padding: '0.3rem' }}>
                    <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                    <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="demo__preview">
              <div className="demo__preview__title">禁用不可展开或者关闭</div>
              <div className="demo__preview__content">
                <Accordion
                  defaultActiveIndex={0}
                >
                  <Accordion.Item
                    label="不可关闭项"
                    disabled
                  >
                    <div className="text__content" style={{ padding: '0.3rem' }}>
                      <p>爱彼迎上的所有评价均由爱彼迎房东和旅行者所撰写。因此，您看到的评价都是基于房客在房东房源内完成的某次住宿。</p>
                      <p>退房后您有14天的时间为旅程撰写评价。</p>
                    </div>
                  </Accordion.Item>
                  <Accordion.Item
                    label="预订的价格是如何计算的？"
                  >
                    <div className="text__content" style={{ padding: '0.3rem' }}>
                      <p>爱彼迎上的预订总价取决于好几个因素。请注意，房东一旦接受您的预订申请（或者如果您使用闪订功能预订住宿），系统便会按此价格全额收取费用。</p>
                      <p>有些房东为支付其房源的清洁费用而收取的一次性费用额外房客费：有些房东为支付与使用他们的房源有关的其他费用而收取的一次性费用</p>
                    </div>
                  </Accordion.Item>
                  <Accordion.Item
                    label="如何取消我的预订？"
                  >
                    <div className="text__content" style={{ padding: '0.3rem' }}>
                      <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                      <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
                    </div>
                  </Accordion.Item>
                  <Accordion.Item
                    label="不可展开项"
                    disabled
                  >
                    <div className="text__content" style={{ padding: '0.3rem' }}>
                      <p>爱彼迎上的所有评价均由爱彼迎房东和旅行者所撰写。因此，您看到的评价都是基于房客在房东房源内完成的某次住宿。</p>
                      <p>退房后您有14天的时间为旅程撰写评价。</p>
                    </div>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

            <div className="demo__preview">
              <div className="demo__preview__title">自定义样式</div>
              <div className="demo__preview__content">
                <Accordion
                  className="my-accordion"
                >
                  <Accordion.Item
                    label="评价是怎么来的？"
                  >
                    <div className="text__content" style={{ padding: '0.3rem' }}>
                      <p>爱彼迎上的所有评价均由爱彼迎房东和旅行者所撰写。因此，您看到的评价都是基于房客在房东房源内完成的某次住宿。</p>
                      <p>退房后您有14天的时间为旅程撰写评价。</p>
                    </div>
                  </Accordion.Item>
                  <Accordion.Item
                    label="预订的价格是如何计算的？"
                  >
                    <div className="text__content" style={{ padding: '0.3rem' }}>
                      <p>爱彼迎上的预订总价取决于好几个因素。请注意，房东一旦接受您的预订申请（或者如果您使用闪订功能预订住宿），系统便会按此价格全额收取费用。</p>
                      <p>有些房东为支付其房源的清洁费用而收取的一次性费用额外房客费：有些房东为支付与使用他们的房源有关的其他费用而收取的一次性费用</p>
                    </div>
                  </Accordion.Item>
                  <Accordion.Item
                    label="如何取消我的预订？"
                  >
                    <div className="text__content" style={{ padding: '0.3rem' }}>
                      <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                      <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
                    </div>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default AccordionExample;
