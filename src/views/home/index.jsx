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
        <p>首页~~~</p>
        <Tabs animated defaultActiveKey="22" onChange={callback} onTabClick={handleTabClick}>
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
          <TabPane tab={'标签 3'} key="3" disabled>
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
        <Tabs defaultActiveKey="11" onChange={callback} onTabClick={handleTabClick}>
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
