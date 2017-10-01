import React from 'react';
import ScrollView from '@/components/scroll-view';
import Button from '@/components/button';

const PlaceHolderX = (props) => {
  return (
    <div
      style={{
        backgroundColor: '#ebebef',
        color: '#808080',
        textAlign: 'center',
        width: '2.5rem',
        height: '3rem',
        lineHeight: '3rem',
        margin: '0 0.2rem',
      }}
      {...props}
    >
      Item
    </div>
  );
};

const PlaceHolderY = (props) => {
  return (
    <div
      style={{
        backgroundColor: '#ebebef',
        color: '#808080',
        textAlign: 'center',
        width: '100%',
        height: '2.5rem',
        lineHeight: '2.5rem',
        margin: '0.2rem 0',
      }}
      {...props}
    >
      Item
    </div>
  );
};

const itemXAtt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const itemYAtt = [1, 2, 3, 4, 5];

export default class ScrollViewExample extends React.Component {
  state = {
    scrollLeft: 0,
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">ScrollView</div>
          <div className="page__desc">可滚动视图区域</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">水平</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <ScrollView
                scrollX
              >
                {
                  itemXAtt.map((item, index) => {
                    const key = `item-x-${index}`;
                    return (
                      <ScrollView.Item key={key}><PlaceHolderX /></ScrollView.Item>
                    );
                  })
                }
              </ScrollView>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">垂直</div>
            <div className="demo__preview__content">
              <ScrollView
                scrollY
                style={{
                  backgroundColor: '#fff',
                  height: '4rem',
                }}
              >
                {
                  itemYAtt.map((item, index) => {
                    const key = `item-x-${index}`;
                    return (
                      <ScrollView.Item scroll="y" key={key}><PlaceHolderY /></ScrollView.Item>
                    );
                  })
                }
              </ScrollView>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">滚动到指定位置</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <ScrollView
                scrollX
                scrollLeft={this.state.scrollLeft}
              >
                {
                  itemXAtt.map((item, index) => {
                    const key = `item-x-${index}`;
                    return (
                      <ScrollView.Item key={key}><PlaceHolderX /></ScrollView.Item>
                    );
                  })
                }
              </ScrollView>
              <div
                style={{
                  padding: '0.3rem',
                }}
              >
                <span>滚动到：</span>
                <Button onClick={() => { this.setState({ scrollLeft: 100 }); }}>100</Button>
                <Button onClick={() => { this.setState({ scrollLeft: 200 }); }}>200</Button>
                <Button onClick={() => { this.setState({ scrollLeft: 300 }); }}>300</Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
