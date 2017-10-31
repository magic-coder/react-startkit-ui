import React from 'react';

import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';
import SegmentedControl from '@/components/segmented-control';

export default class SegmentedControlExample extends React.Component {
  render() {
    return (
      <div className="page page__segmented">
        <div className="page__header">
          <div className="page__title">SegmentedControl</div>
          <div className="page__desc">分段器</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">简单的使用</div>
            <div className="demo__preview__content">
              <WingBlank>
                <SegmentedControl className="my-segment" values={['Segment1', 'Segment2']} />
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">禁用</div>
            <div className="demo__preview__content">
              <WingBlank>
                <SegmentedControl disabled values={['Segment1', 'Segment2']} />
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">默认选中项</div>
            <div className="demo__preview__content">
              <WingBlank>
                <SegmentedControl selectedIndex={1} values={['Segment1', 'Segment2', 'Segment3']} />
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">色调</div>
            <div className="demo__preview__content">
              <WingBlank>
                <SegmentedControl
                  values={['Segment1', 'Segment2', 'Segment3']}
                  tintColor={'#ff0000'}
                  style={{ height: '0.8rem', width: '5.5rem' }}
                />
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">onChange/onValueChange 回调</div>
            <div className="demo__preview__content">
              <WingBlank>
                <SegmentedControl
                  values={['Segment1', 'Segment2', 'Segment3']}
                  onChange={(ev) => {
                    console.log(`选择的index =>> ${ev.nativeEvent.selectedSegmentIndex}`);
                  }}
                  onValueChange={(value) => {
                    console.log(`选择的value =>> ${value}`);
                  }}
                />
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

        </div>
      </div>
    );
  }
}
