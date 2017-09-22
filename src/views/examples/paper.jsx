import React from 'react';
import Paper from '@/components/paper';

import './scss/paper';

export default class PaperExample extends React.Component {
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Paper</div>
          <div className="page__desc">一个阴影效果的容器</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">简单的使用</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <Paper className="my-paper" zDepth={1} />
              <Paper className="my-paper" zDepth={2} />
              <Paper className="my-paper" zDepth={3} />
              <Paper className="my-paper" zDepth={4} />
              <Paper className="my-paper" zDepth={5} />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">圆形的纸片</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <Paper className="my-paper" circle zDepth={1} />
              <Paper className="my-paper" circle zDepth={2} />
              <Paper className="my-paper" circle zDepth={3} />
              <Paper className="my-paper" circle zDepth={4} />
              <Paper className="my-paper" circle zDepth={5} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
