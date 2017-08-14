import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Tabs, { TabPane } from '@/components/tabs';

import testActions from '@/actions';

const callback = (key) => {
  console.log('onChange', key);
};

const handleTabClick = (key) => {
  console.log('onTabClick', key);
};

class Home extends React.Component {
  static propTypes = {
    test: PropTypes.any,
  }

  static defaultProps = {
    test: null,
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">React Startkit UI</div>
          <div className="page__desc">React Startkit UI 是一套移动端基础组件库</div>
        </div>
        <div className="page__body">
          <Tabs animated defaultActiveKey="4" pageSize={4} onChange={callback} onTabClick={handleTabClick}>
            <TabPane tab={'标签1'} key="1">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of First Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 2'} key="2">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Second Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 3'} key="3">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Third Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 4'} key="4">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Fourth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 5'} key="5">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Fifth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 6'} key="6">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Fixth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 7'} key="7">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Seventh Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 8'} key="8">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Eighth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 9'} key="9">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Ninth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 10'} key="10">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Tenth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 11'} key="11">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Eleventh Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 12'} key="12">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Twelevth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 13'} key="13">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Thirteenth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 14'} key="14">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Fourteenth Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 15'} key="15">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Fifteenth Tab
              </div>
            </TabPane>
          </Tabs>
          <br />
          <br />
          <Tabs animated defaultActiveKey="22" pageSize={5} onChange={callback} onTabClick={handleTabClick}>
            <TabPane tab={'标签1'} key="11">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of First Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 2'} key="22">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Second Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 3'} key="3">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Third Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 4'} key="4">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Four Tab
              </div>
            </TabPane>
          </Tabs>
          <br />
          <br />
          <Tabs defaultActiveKey="3" onChange={callback} onTabClick={handleTabClick}>
            <TabPane tab={'标签1'} key="11">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of First Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 2'} key="22">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Second Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 3'} key="3">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Third Tab
              </div>
            </TabPane>
            <TabPane tab={'标签 4'} key="4" disabled>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                Content of Four Tab
              </div>
            </TabPane>
          </Tabs>
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
