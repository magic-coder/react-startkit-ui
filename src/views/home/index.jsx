import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import testActions from '@/actions';

import Accordion from '@/components/accordion';

import './scss/home';

class Home extends React.Component {
  static propTypes = {
    test: PropTypes.any,
  }

  static defaultProps = {
    test: null,
  }

  render() {
    console.log(this.props.test);
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">React Startkit UI</div>
          <div className="page__desc">React Startkit UI 是一套移动端基础组件库</div>
        </div>
        <div className="page__body">
          <Accordion
            className="accordion__category"
          >
            <Accordion.Item
              label="布局 Layout"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>爱彼迎上的所有评价均由爱彼迎房东和旅行者所撰写。因此，您看到的评价都是基于房客在房东房源内完成的某次住宿。</p>
                <p>退房后您有14天的时间为旅程撰写评价。</p>
              </div>
            </Accordion.Item>
            <Accordion.Item
              label="导航 Navigation"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>爱彼迎上的预订总价取决于好几个因素。请注意，房东一旦接受您的预订申请（或者如果您使用闪订功能预订住宿），系统便会按此价格全额收取费用。</p>
                <p>有些房东为支付其房源的清洁费用而收取的一次性费用额外房客费：有些房东为支付与使用他们的房源有关的其他费用而收取的一次性费用</p>
              </div>
            </Accordion.Item>
            <Accordion.Item
              label="数据展示 Data Display"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
              </div>
            </Accordion.Item>
            <Accordion.Item
              label="数据录入 Data Entry"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
              </div>
            </Accordion.Item>
            <Accordion.Item
              label="操作反馈 Feedback"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
              </div>
            </Accordion.Item>
            <Accordion.Item
              label="组合组件 Combination"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>您可以在旅程开始前或旅程期间随时取消预订。要取消预订，请按以下步骤操作：</p>
                <p>1.前往您的旅程; 2.在您要取消的预订旁边点击更改或取消; 3.选择取消预订</p>
              </div>
            </Accordion.Item>
            <Accordion.Item
              label="其他 Other"
            >
              <div className="text__content" style={{ padding: '0.3rem' }}>
                <p>其他 Other</p>
              </div>
            </Accordion.Item>
          </Accordion>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { test } = state;
  return {
    test,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    testActions: bindActionCreators({ testActions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
