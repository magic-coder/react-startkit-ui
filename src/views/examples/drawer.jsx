import React from 'react';
import Button from '@/components/button';
import List from '@/components/list';
import Drawer from '@/components/drawer';

import './scss/drawer';

const Sidebar = () => {
  return (
    <List>
      {[...Array(20).keys()].map((item, index) => {
        const idx = `${index + 1}`;

        if (index === 0) {
          return (
            <List.Item
              key={idx}
              thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
              multipleLine
            >
              Category
            </List.Item>
          );
        }
        return (
          <List.Item
            key={idx}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          >
            Category{index}
          </List.Item>);
      })}
    </List>
  );
};

export default class PaperExample extends React.Component {
  state = {
    position: 'left',
    overlay: true,
    open: false,
    docked: false,
  }

  onOpenChange = (...args) => {
    console.log(args);
    this.setState({
      open: !this.state.open,
    });
  }

  onDockedChange = (...args) => {
    console.log(args);
    this.setState({
      docked: !this.state.docked,
    });
  }

  renderNormalDemo() {
    const sidebar = <Sidebar />;
    return (
      <Drawer
        className="my-drawer--normal"
        style={{ minHeight: document.documentElement.clientHeight }}
        open={this.state.open}
        position={this.state.position}
        overlay={this.state.overlay}
        sidebar={sidebar}
        onOpenChange={() => {
          console.log('onOpenChange ~~');
          this.onOpenChange();
        }}
      >
        <div className="page page__drawer">
          <div className="page__header">
            <div className="page__title">Drawer</div>
            <div className="page__desc">抽屉菜单</div>
          </div>
          <div className="page__body">

            <div className="demo__preview">
              <div className="demo__preview__title">基础</div>
              <div className="demo__preview__content demo__preview__content--bg">
                <div style={{ textAlign: 'center', margin: '1rem 0.2rem' }}>
                  <p style={{ textAlign: 'center', margin: '0.3rem 0' }}>
                    {
                      ['left', 'right', 'top', 'bottom'].map((i, index) => {
                        const key = `${index + 1}`;
                        return (
                          <span
                            key={key}
                            style={{ margin: '0 0.2rem' }}
                          >
                            <label htmlFor={`pos-${index}`}>
                              <input
                                type="radio"
                                value={i}
                                id={`pos-${index}`}
                                checked={this.state.position === i}
                                onChange={(ev) => { this.setState({ position: ev.target.value }); }}
                              />
                              {i}
                            </label>
                          </span>
                        );
                      })
                    }
                  </p>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({
                        open: true,
                      });
                    }}
                  >打开/关闭</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    );
  }

  renderDockedDemo() {
    const sidebar = <Sidebar />;
    return (
      <Drawer
        className="my-drawer--normal"
        style={{ minHeight: document.documentElement.clientHeight }}
        contentStyle={{ height: document.documentElement.clientHeight }}
        docked={this.state.docked}
        position={this.state.position}
        overlay={this.state.overlay}
        sidebar={sidebar}
        onOpenChange={this.onDockedChange}
      >
        <div className="page page__drawer">
          <div className="page__header">
            <div className="page__title">Drawer</div>
            <div className="page__desc">抽屉菜单</div>
          </div>
          <div className="page__body">

            <div className="demo__preview">
              <div className="demo__preview__title">嵌入文档模式</div>
              <div className="demo__preview__content demo__preview__content--bg">
                <div style={{ textAlign: 'center', margin: '1rem 0.2rem' }}>
                  <p style={{ textAlign: 'center', margin: '0.3rem 0' }}>
                    {
                      ['left', 'right', 'top', 'bottom'].map((i, index) => {
                        const key = `${index + 1}`;
                        return (
                          <span
                            key={key}
                            style={{ margin: '0 0.2rem' }}
                          >
                            <label htmlFor={`pos-${index}`}>
                              <input
                                type="radio"
                                value={i}
                                id={`pos-${index}`}
                                checked={this.state.position === i}
                                onChange={(ev) => { this.setState({ position: ev.target.value }); }}
                              />
                              {i}
                            </label>
                          </span>
                        );
                      })
                    }
                  </p>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({
                        docked: true,
                      });
                    }}
                  >打开/关闭</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    );
  }

  render() {
    const urlHash = window.location.hash;
    const contentDOM = urlHash === '#drawer-demo-0' || urlHash === '' ? this.renderNormalDemo() : this.renderDockedDemo();

    return (
      <div>{contentDOM}</div>
    );
  }
}
