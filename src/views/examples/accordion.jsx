import React from 'react';
import { Link } from 'react-router-dom';

import Accordion from '@/components/accordion';
import Panel from '@/components/panel';
import WhiteSpace from '@/components/white-space';
import WingBlank from '@/components/wing-blank';

class AccordionExample extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Accordion</div>
          <div className="page__desc">手风琴</div>
        </div>
        <div className="page__body">
          <Accordion className="my-accordion">
            <Accordion.Item
              label="评价是怎么来的？"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>爱彼迎上的所有评价均由爱彼迎房东和旅行者所撰写。因此，您看到的评价都是基于房客在房东房源内完成的某次住宿。</p>
                <p>退房后您有14天的时间为旅程撰写评价。</p>
                <h3>撰写评价</h3>
                <p>要为您最近的一次旅程发表评价，请前往您的评价。评价字数不能超过500字，
                  且必须遵守爱彼迎的评价准则。除非您的房东或房客已完成评价的撰写，否则您可以在48小时内对您写的评价进行编辑。</p>
              </div>
            </Accordion.Item>
            <Accordion.Item
              label="预订的价格是如何计算的？"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>爱彼迎上的预订总价取决于好几个因素。请注意，房东一旦接受您的预订申请（或者如果您使用闪订功能预订住宿），系统便会按此价格全额收取费用。</p>
                <p>由房东决定的费用：每晚价格：由房东决定的每晚费用清洁费：
                  有些房东为支付其房源的清洁费用而收取的一次性费用额外房客费：有些房东为支付与使用他们的房源有关的其他费用而收取的一次性费用</p>
              </div>
            </Accordion.Item>
            <Accordion.Item
              label="如何取消我的预订？"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                <p>1.前往您的旅程</p>
                <p>2.在您要取消的预订旁边点击更改或取消</p>
                <p>3.选择取消预订</p>
              </div>
            </Accordion.Item>
          </Accordion>
          <WhiteSpace size="lg" />

          <Panel>
            <Panel.Header
              title="标题 - 页面主体"
              extra={<Link to="/" replace>详情</Link>}
            />
            <Panel.Body>
              <WingBlank>
                <WhiteSpace size="lg" />
                <div className="text__content">
                  <p>React 是一个用于构建用户界面的 JAVASCRIPT 库，主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。</p>
                  <p>React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。</p>
                  <p>React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。</p>
                </div>
                <WhiteSpace size="lg" />
              </WingBlank>
            </Panel.Body>
            <Panel.Footer content={<Link to="/" replace>查看更多</Link>} />
          </Panel>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  }
}

export default AccordionExample;
