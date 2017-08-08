import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import testActions from '@/actions';

class Home extends React.Component {
  static propTypes = {
    test: PropTypes.any,
  }

  static defaultProps = {
    test: null,
  }

  componentWillMount = () => {
    console.log('componentWillMount~~~');
  }

  componentDidMount = () => {
    console.log('componentDidMount~~~');
  }

  render() {
    return (
      <div className="page page__home">
        <p>首页~~~</p>
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
