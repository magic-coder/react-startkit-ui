import React from 'react';

import Grid from '@/components/grid';

import iconImage from '@/assets/images/icon.png';

const data = Array.from(new Array(9)).map((_val, i) => {
  return ({
    icon: iconImage,
    // text: `Item ${i + 1}`,
    text: `九宫格 ${i + 1}`,
  });
});

const data1 = Array.from(new Array(9)).map(() => {
  return ({
    icon: iconImage,
  });
});

export default class GridExample extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Grid</div>
          <div className="page__desc">网格 / 宫格</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基本 - 三列</div>
            <div className="demo__preview__content">
              <Grid
                data={data}
                columnNum={3}
                onClick={(ele, index) => { console.log(ele, index); }}
              />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">基本 - 四列</div>
            <div className="demo__preview__content">
              <Grid data={data} />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">无边框线</div>
            <div className="demo__preview__content">
              <Grid data={data} hasLine={false} />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">自定义内容</div>
            <div className="demo__preview__content">
              <Grid
                data={data1}
                columnNum={3}
                renderItem={
                  (dataItem) => {
                    return (
                      <div style={{ padding: '0.25rem' }}>
                        <img src={dataItem.icon} style={{ width: '1rem', height: '1rem' }} alt="icon" />
                        <div style={{ color: '#808080', fontSize: '0.24rem', marginTop: '0.20rem' }}>
                          <span>我是标题..</span>
                        </div>
                      </div>
                    );
                  }
                }
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
