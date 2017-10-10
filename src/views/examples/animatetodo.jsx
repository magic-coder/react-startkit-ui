import React from 'react';
// import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import velocity from 'velocity-animate';

import Button from '@/components/button';
import WhiteSpace from '@/components/white-space';
import WingBlank from '@/components/wing-blank';

import Todo from './todo';

import './scss/animate';

export default class AnimateTodoExample extends React.Component {
  state = {
    items: ['hello', 'world', 'click', 'me'],
    itemsForJS: ['hello', 'world', 'click', 'me'],
  }

  handleAdd() {
    const newItem = prompt('Enter some text');
    if (!newItem) {
      return;
    }
    const items = this.state.items.concat([newItem]);

    this.setState({
      items,
    });
  }

  handleAddJS() {
    const newItem = prompt('Enter some text');
    if (!newItem) {
      return;
    }
    const items = this.state.itemsForJS.concat([newItem]);

    this.setState({
      itemsForJS: items,
    });
  }

  // 删除
  handleRemove(i) {
    const items = this.state.items.concat();
    items.splice(i, 1);

    this.setState({
      items,
    });
  }

  // 删除
  handleRemoveJS(i) {
    // const items = this.state.itemsForJS.concat();
    const newItems = this.state.itemsForJS;
    newItems.splice(i, 1);

    this.setState({
      itemsForJS: newItems,
    });
  }

  // JS 版本显示
  animateEnter = (node, doneCallback) => {
    let ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        doneCallback();
      }
    }

    velocity(node, 'slideDown', {
      duration: 2000,
      complete,
    });

    return {
      stop() {
        velocity(node, 'finish');
        complete();
      },
    };
  }

  // JS 版本隐藏
  animateLeave = (node, doneCallback) => {
    let ok = false;

    function complete() {
      if (!ok) {
        ok = true;
        doneCallback();
      }
    }

    velocity(node, 'slideUp', {
      duration: 1000,
      complete,
    });

    return {
      stop() {
        velocity(node, 'finish');
        complete();
      },
    };
  }

  render() {
    const items = this.state.items.map((item, i) => {
      const key = `${item}`;
      return (
        <Todo key={key} onClick={() => { this.handleRemove(i); }}>
          {item}
        </Todo>
      );
    });

    const itemsForJS = this.state.itemsForJS.map((item, i) => {
      const key = `${item}`;
      return (
        <Todo key={key} onClick={() => { this.handleRemoveJS(i); }}>
          {item}
        </Todo>
      );
    });

    return (
      <div className="page page__animate">
        <div className="page__header">
          <div className="page__title">Animate Demo</div>
          <div className="page__desc">动画效果示例</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">CSS 版</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Button onClick={() => { this.handleAdd(); }}>新增</Button>
                <WhiteSpace size="lg" />
                <Animate
                  component="div"
                  transitionName="fade"
                >
                  {items}
                </Animate>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">JS 版</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Button onClick={() => { this.handleAddJS(); }}>新增</Button>
                <WhiteSpace size="lg" />
                <Animate
                  animation={{
                    enter: this.animateEnter,
                    leave: this.animateLeave,
                  }}
                >
                  {itemsForJS}
                </Animate>
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
