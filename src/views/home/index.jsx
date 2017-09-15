import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import testActions from '@/actions';

import Accordion from '@/components/accordion';
import Divider from '@/components/divider';
import List from '@/components/list';

import './scss/home';

class Home extends React.Component {
  static propTypes = {
    test: PropTypes.any,
    history: PropTypes.object,
  }

  static defaultProps = {
    test: null,
  }

  render() {
    console.log(this.props.test);
    // console.log(this.props);
    console.log('process.env.NODE_ENV =>>', process.env.NODE_ENV);
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">React Startkit UI</div>
          <div className="page__desc">React Startkit UI 是一套移动端基础组件库</div>
        </div>
        <div className="page__body">
          {
            process.env.NODE_ENV !== 'development' ? null : (
              <div>
                <p>开发模式下才显示~</p>
              </div>
            )
          }

          <p style={{ padding: '0.5rem' }}>
            <Link to="/" style={{ padding: '0.5rem' }}>Home</Link>
            <Link to="/grid" style={{ padding: '0.5rem' }}>Grid</Link>
            <Link to="/badge" style={{ padding: '0.5rem' }}>Badge</Link>
          </p>

          <Accordion
            className="accordion__category"
          >
            <Accordion.Item
              label="布局 Layout"
            >
              <List transparent className="category__list">
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/flex'); }}>Flex 布局</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/grid'); }}>Grid 网格</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/whitespace'); }}>WhiteSpace 上下留白</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/wingblank'); }}>WingBlank 两翼留白</List.Item>
              </List>
            </Accordion.Item>
            <Accordion.Item
              label="导航 Navigation"
            >
              <List transparent className="category__list">
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/navbar'); }}>NavBar 导航栏</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/searchbar'); }}>SearchBar 搜索栏</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/tabbar'); }}>TabBar 标签栏</List.Item>
              </List>
            </Accordion.Item>
            <Accordion.Item
              label="数据展示 Data Display"
            >
              <List transparent className="category__list">
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/panel'); }}>Panel 面包</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/divider'); }}>Divider 间隔线</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/tabs'); }}>Tabs 选项卡</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/accordion'); }}>Accordion 手风琴</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/badge'); }}>Badge 徽标数</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/icon'); }}>Icon 图标</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/list'); }}>List 列表</List.Item>
              </List>
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
