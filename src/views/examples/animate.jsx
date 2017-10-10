import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import velocity from 'velocity-animate';

import Button from '@/components/button';
import WhiteSpace from '@/components/white-space';
import WingBlank from '@/components/wing-blank';

import './scss/animate';

// 示例 DIV
const Div = (props) => {
  const { style } = props;
  const isShow = props['data-show'];
  const newStyle = Object.assign({}, style, {
    display: isShow ? '' : 'none',
  });
  return <div {...props} style={newStyle} />;
};
Div.propTypes = {
  style: PropTypes.object,
  'data-show': PropTypes.bool,
};

const Box = (props) => {
  const { style } = props;
  const isShow = props['data-visible'];
  const newStyle = Object.assign({}, style, {
    display: isShow ? '' : 'none',
  });
  return <div {...props} style={newStyle} />;
};
Box.propTypes = {
  style: PropTypes.object,
  'data-visible': PropTypes.bool,
};


/**
 * http://react-component.github.io/animate/
 * https://blog.yiminghe.me/2015/07/23/rc-animate/
 */
export default class AnimateExample extends React.Component {
  state = {
    exclusive: false,
    enter: true,
    enterRemove: true,
    visible: true,
  }

  /**
   * 显示/隐藏
   */
  toggle(field) {
    this.setState({
      [field]: !this.state[field],
    });
  }

  animateEnter = (node, done) => {
    let ok = false;

    // 完成运动后的回调函数
    function complete() {
      if (!ok) {
        console.log('Animate Enter Complete...');
        ok = 1;
        done();
      }
    }

    node.style.display = 'none';
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

  animateLeave = (node, done) => {
    let ok = false;

    // 完成运动后的回调函数
    function complete() {
      if (!ok) {
        console.log('Animate Leave Complete...');
        ok = 1;
        done();
      }
    }

    node.style.display = 'block';
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
    const boxStyle = {
      width: '2rem',
      height: '2rem',
      backgroundColor: 'red',
    };

    return (
      <div className="page page__animate">
        <div className="page__header">
          <div className="page__title">Animate</div>
          <div className="page__desc">动画效果</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基础</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <div>
                  <WhiteSpace size="lg" />
                  <label
                    htmlFor="checkbox1"
                    className="demo-label"
                  >
                    <input
                      type="checkbox"
                      name="checkbox1"
                      id="checkbox1"
                      onChange={() => { this.toggle('enter'); }}
                      checked={this.state.enter}
                    />
                    show
                  </label>
                  <WhiteSpace size="lg" />
                </div>
                <Animate
                  component=""
                  exclusive={this.state.exclusive}
                  showProp="data-show"
                  transitionName="fade"
                >
                  <Div data-show={this.state.enter} style={boxStyle} />
                </Animate>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">基础 - remove</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <div>
                  <WhiteSpace size="lg" />
                  <Button onClick={() => { this.toggle('enterRemove'); }}>Toggle</Button>
                  <WhiteSpace size="lg" />
                </div>
                <Animate
                  component=""
                  transitionName="fade"
                >
                  {
                    this.state.enterRemove ? (
                      <Div data-show={this.state.enterRemove} style={boxStyle} />
                    ) : null
                  }
                </Animate>
              </WingBlank>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">JS 动画</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <div>
                  <WhiteSpace size="lg" />
                  <label
                    htmlFor="checkbox2"
                    className="demo-label"
                  >
                    <input
                      type="checkbox"
                      name="checkbox2"
                      id="checkbox2"
                      onChange={() => { this.toggle('visible'); }}
                      checked={this.state.visible}
                    />
                    show
                  </label>
                  <WhiteSpace size="lg" />
                </div>
                <Animate
                  component=""
                  showProps="data-visible"
                  animation={{
                    enter: this.animateEnter,
                    leave: this.animateLeave,
                  }}
                >
                  {
                    this.state.visible ? (
                      <Box data-visible={this.state.visible} style={boxStyle} />
                    ) : null
                  }
                </Animate>
              </WingBlank>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
