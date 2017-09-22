import React from 'react';
import Popover from '@/components/popover';
import NavBar from '@/components/nav-bar';
import Divider from '@/components/divider';
import Icon from '@/components/icon';
import Menu from '@/components/menu';

export default class PopverExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMenuVisible: false,
      visible: false,
    };
  }

  renderPopoverContent = () => {
    return (
      <Menu>
        <Menu.Item
          thumb={<Icon type="search" size="xxs" />}
          href="https://www.baidu.com"
        >
          搜索
        </Menu.Item>
        <Menu.Item
          thumb={<Icon type="scan" size="xxs" />}
          onClick={() => {
            const msg = '点击了扫一扫';
            alert(msg);
            console.log(msg);
          }}
        >
          扫一扫
        </Menu.Item>
        <Divider />
        <Menu.Item
          thumb={<Icon type="home" size="xxs" />}
          href="/"
        >
          首页
        </Menu.Item>
        <Menu.Item
          thumb={<Icon type="me" size="xxs" />}
        >
          退出
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    const popoverContent = this.renderPopoverContent();

    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Popover</div>
          <div className="page__desc">气泡菜单</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基本</div>
            <div className="demo__preview__content">
              <NavBar
                className="my-navbar"
                mode="dark"
                rightContent={
                  <Popover
                    className="popover-menu"
                    visible={this.state.subMenuVisible}
                    position={this.state.position}
                    placement="bottomRight"
                    overlay
                    offsetX={-10}
                    overlayClick={(ev) => {
                      ev.stopPropagation();
                      this.setState({
                        subMenuVisible: false,
                      });
                    }}
                    close={(ev) => {
                      ev.stopPropagation();
                      this.setState({
                        subMenuVisible: false,
                      });
                    }}
                    content={popoverContent}
                  >
                    <div
                      role="button"
                      tabIndex="-1"
                      style={{
                        height: '100%',
                        padding: '0 0.3rem',
                        marginRight: '-0.3rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        this.setState({
                          subMenuVisible: !this.state.subMenuVisible,
                        });
                      }}
                    >
                      <Icon type="ellipsis" />
                    </div>
                  </Popover>
                }
              >
                关于我们
              </NavBar>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
