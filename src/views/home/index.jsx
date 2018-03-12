import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
              <div style={{ padding: '0.5rem 0.3rem' }}>
                <p>开发模式下才显示~</p>
              </div>
            )
          }
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
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/scrollview'); }}>ScrollView 滚动视图区域</List.Item>
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
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/menu'); }}>Menus 菜单组件</List.Item>
              </List>
            </Accordion.Item>
            <Accordion.Item
              label="数据展示 Data Display"
            >
              <List transparent className="category__list">
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/panel'); }}>Panel 面板</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/divider'); }}>Divider 间隔线</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/paper'); }}>Paper 阴影容器</List.Item>
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
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/marquee'); }}>Marquee 跑马灯</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/carousel'); }}>Carousel 轮播图</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/steps'); }}>Steps 步骤条</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/segmented-control'); }}>SegmentedControl 分段器</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/progress'); }}>进度条</List.Item>
              </List>
            </Accordion.Item>
            <Accordion.Item
              label="数据录入 Data Entry"
            >
              <List transparent className="category__list">
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/pagination'); }}>Pagination 分页器</List.Item>
              </List>
            </Accordion.Item>
            <Accordion.Item
              label="操作反馈 Feedback"
            >
              <List transparent className="category__list">
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/popover'); }}>Popover 气泡菜单</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/divider'); }}>Divider 间隔线</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/noticebar'); }}>Noticebar 通告栏</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/notification'); }}>Notification 通知提醒信息</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/toast'); }}>Toast 轻提示弹窗</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/dialog'); }}>Dialog 弹窗</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/modal'); }}>Modal 模态对话框</List.Item>
                <Divider shallowInset />
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/action-sheet'); }}>ActionSheet 动作面板</List.Item>
              </List>
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
              <List transparent className="category__list">
                <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/locale-provider'); }}>LocaleProvider 国际化</List.Item>
              </List>
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
