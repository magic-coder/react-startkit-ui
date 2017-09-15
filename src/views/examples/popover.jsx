import React from 'react';
import Popover from '@/components/popover';

export default class PopverExample extends React.Component {
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Popover</div>
          <div className="page__desc">气泡菜单</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基本</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <button>显示</button>
              <Popover
                className="my-popover"
                visible
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
