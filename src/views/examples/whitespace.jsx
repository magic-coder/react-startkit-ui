import React from 'react';

import WhiteSpace from '@/components/white-space';

class WhiteSpaceExample extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    const blockStyle = {
      backgroundColor: 'rgb(235, 235, 239)',
      color: 'rgb(187, 187, 187)',
      textAlign: 'center',
      height: '0.6rem',
      lineHeight: '0.6rem',
      width: '100%',
    };
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">WhiteSpace</div>
          <div className="page__desc">上下留白</div>
        </div>
        <div className="page__body">
          <div style={blockStyle}>Block</div>
          <WhiteSpace size="xs" />
          <div style={blockStyle}>Block</div>
          <WhiteSpace size="sm" />
          <div style={blockStyle}>Block</div>
          <WhiteSpace size="md" />
          <div style={blockStyle}>Block</div>
          <WhiteSpace size="lg" />
          <div style={blockStyle}>Block</div>
          <WhiteSpace size="xl" />
          <div style={blockStyle}>Block</div>
        </div>
      </div>
    );
  }
}

export default WhiteSpaceExample;
