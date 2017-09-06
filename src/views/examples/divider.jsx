import React from 'react';
import Divider from '@/components/divider';

export default class DividerExample extends React.Component {
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Divider</div>
          <div className="page__desc">间隔线</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基本</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <p style={{ padding: '0.30rem 0.30rem' }}>列表</p>
              <Divider className="my-divider" />
              <p style={{ padding: '0.30rem 0.30rem' }}>列表</p>
              <Divider />
              <p style={{ padding: '0.30rem 0.30rem' }}>列表</p>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">缩进</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <p style={{ padding: '0.30rem 0.30rem 0.30rem 0.60rem' }}>列表</p>
              <Divider inset />
              <p style={{ padding: '0.30rem 0.30rem 0.30rem 0.60rem' }}>列表</p>
              <Divider inset />
              <p style={{ padding: '0.30rem 0.30rem 0.30rem 0.60rem' }}>列表</p>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">浅缩进</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <p style={{ padding: '0.30rem 0.30rem' }}>列表</p>
              <Divider shallowInset />
              <p style={{ padding: '0.30rem 0.30rem' }}>列表</p>
              <Divider shallowInset />
              <p style={{ padding: '0.30rem 0.30rem' }}>列表</p>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">深缩进</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <p style={{ padding: '0.30rem 0.30rem 0.30rem 1.1rem' }}>列表</p>
              <Divider deepInset />
              <p style={{ padding: '0.30rem 0.30rem 0.30rem 1.1rem' }}>列表</p>
              <Divider deepInset />
              <p style={{ padding: '0.30rem 0.30rem 0.30rem 1.1rem' }}>列表</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
