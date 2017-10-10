import React from 'react';
import PropTypes from 'prop-types';

export default class Todo extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    end: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    end: () => {},
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    console.log(this.props.children);
    this.props.end();
  }

  render() {
    const props = this.props;
    const style = {
      width: '3rem',
      border: '1px solid red',
      padding: '0.2rem 0.3rem',
      margin: '0.3rem 0',
    };
    return (
      <div role="button" tabIndex="-1" onClick={this.props.onClick} style={style}>
        {props.children}
      </div>
    );
  }
}
