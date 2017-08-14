import React from 'react';

import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';

class WingBlankExample extends React.Component {
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
          <div className="page__title">WingBlank</div>
          <div className="page__desc">两翼留白</div>
        </div>
        <div className="page__body">
          <WingBlank size="lg">
            <div style={blockStyle}>Block</div>
          </WingBlank>
          <WhiteSpace size="lg" />
          <WingBlank size="md">
            <div style={blockStyle}>Block</div>
          </WingBlank>
          <WhiteSpace size="lg" />
          <WingBlank size="sm">
            <div style={blockStyle}>Block</div>
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default WingBlankExample;
