import React from 'react';
import Paper from '@/components/paper';
import Divider from '@/components/divider';
import Icon from '@/components/icon';
import Menu from '@/components/menu';

import thumb1 from '@/assets/images/thumb1.png';
import thumb2 from '@/assets/images/thumb2.png';
import thumb3 from '@/assets/images/thumb3.png';
import thumb4 from '@/assets/images/thumb4.png';

import './scss/menus';

export default class MenusExample extends React.Component {
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Menus</div>
          <div className="page__desc">菜单组件，一般配合 popover 组件使用</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基础</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item>地图</Menu.Item>
                  <Menu.Item>书籍</Menu.Item>
                  <Menu.Item>航班</Menu.Item>
                  <Menu.Item>Apps</Menu.Item>
                </Menu>
              </Paper>
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item>个人资料</Menu.Item>
                  <Menu.Item>修改头像</Menu.Item>
                  <Menu.Item>我的投稿</Menu.Item>
                  <Menu.Item>我的资产</Menu.Item>
                </Menu>
              </Paper>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">不可用菜单</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item extra="Ctrl+Z">撤销(U)</Menu.Item>
                  <Menu.Item extra="Ctrl+Y">恢复(R)</Menu.Item>
                  <Divider />
                  <Menu.Item extra="Ctrl+X">剪切(T)</Menu.Item>
                  <Menu.Item extra="Ctrl+C" disabled>复制(C)</Menu.Item>
                  <Menu.Item extra="Ctrl+V">粘帖(P)</Menu.Item>
                </Menu>
              </Paper>
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item extra="Alt+Left Arrow" arrow="empty">后退(B)</Menu.Item>
                  <Menu.Item extra="Alt+right Arrow" arrow="empty">前进(F)</Menu.Item>
                  <Divider />
                  <Menu.Item extra="Alt+Left Arrow" disabled arrow="empty">切换编辑器(E)</Menu.Item>
                  <Menu.Item arrow>切换组(G)</Menu.Item>
                </Menu>
              </Paper>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">图标</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item thumb={thumb1} extra="Ctrl+Z">撤销(U)</Menu.Item>
                  <Menu.Item thumb={thumb2} extra="Ctrl+Y">恢复(R)</Menu.Item>
                  <Divider />
                  <Menu.Item thumb={thumb3} extra="Ctrl+X">剪切(T)</Menu.Item>
                  <Menu.Item thumb={thumb2} extra="Ctrl+C" disabled>复制(C)</Menu.Item>
                  <Menu.Item thumb={thumb4} extra="Ctrl+V">粘帖(P)</Menu.Item>
                </Menu>
              </Paper>
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item thumb={thumb1} thumbPosition="right" extra="Ctrl+Z">撤销(U)</Menu.Item>
                  <Menu.Item thumb={thumb2} thumbPosition="right" extra="Ctrl+Y">恢复(R)</Menu.Item>
                  <Divider />
                  <Menu.Item thumb={thumb3} thumbPosition="right" extra="Ctrl+X">剪切(T)</Menu.Item>
                  <Menu.Item thumb={thumb2} thumbPosition="right" extra="Ctrl+C" disabled>复制(C)</Menu.Item>
                  <Menu.Item thumb={thumb4} thumbPosition="right" extra="Ctrl+V">粘帖(P)</Menu.Item>
                </Menu>
              </Paper>
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item thumb={<Icon type="set" size="xxs" />}>设置</Menu.Item>
                  <Menu.Item thumb={<Icon type="cart" size="xxs" />}>购物车</Menu.Item>
                  <Divider />
                  <Menu.Item thumb={<Icon type="comments" size="xxs" />} >评论</Menu.Item>
                  <Menu.Item thumb={<Icon type="scan" size="xxs" />}>扫一扫</Menu.Item>
                </Menu>
              </Paper>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">点击事件/页面跳转</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item
                    thumb={<Icon type="set" size="xxs" />}
                    onClick={() => {
                      const msg = '点击了设置';
                      alert(msg);
                      console.log(msg);
                    }}
                  >
                    设置
                  </Menu.Item>
                  <Menu.Item
                    thumb={<Icon type="cart" size="xxs" />}
                    onClick={() => {
                      const msg = '点击了购物车';
                      alert(msg);
                      console.log(msg);
                    }}
                  >
                    购物车
                  </Menu.Item>
                  <Menu.Item
                    thumb={<Icon type="comments" size="xxs" />}
                    onClick={() => {
                      const msg = '点击了评论';
                      alert(msg);
                      console.log(msg);
                    }}
                  >
                    评论
                  </Menu.Item>
                  <Menu.Item
                    disabled
                    thumb={<Icon type="scan" size="xxs" />}
                    onClick={() => {
                      const msg = '点击了扫一扫';
                      alert(msg);
                      console.log(msg);
                    }}
                  >
                    扫一扫
                  </Menu.Item>
                </Menu>
              </Paper>
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Item
                    thumb={<Icon type="home" size="xxs" />}
                    href="/"
                  >
                    首页
                  </Menu.Item>
                  <Menu.Item
                    thumb={<Icon type="comments" size="xxs" />}
                    href="/comments"
                  >
                    评论
                  </Menu.Item>
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
                </Menu>
              </Paper>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">菜单组</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Group className="my-menu-group" label="页面跳转" labelClassName="my-menu-heading">
                    <Menu.Item thumb={<Icon type="home" size="xxs" />}>首页</Menu.Item>
                    <Menu.Item thumb={<Icon type="search" size="xxs" />}>搜索</Menu.Item>
                  </Menu.Group>
                  <Divider />
                  <Menu.Group className="my-menu-group" label="功能设置">
                    <Menu.Item thumb={<Icon type="set" size="xxs" />}>设置</Menu.Item>
                    <Menu.Item thumb={<Icon type="cart" size="xxs" />}>购物车</Menu.Item>
                    <Menu.Item thumb={<Icon type="comments" size="xxs" />}>评论</Menu.Item>
                    <Menu.Item thumb={<Icon type="scan" size="xxs" />}>扫一扫</Menu.Item>
                  </Menu.Group>
                </Menu>
              </Paper>
              <Paper className="demo-menu">
                <Menu className="my-menu">
                  <Menu.Group>
                    <Menu.Heading className="my-menu-heading">页面跳转</Menu.Heading>
                    <Menu.Item thumb={<Icon type="home" size="xxs" />}>首页</Menu.Item>
                    <Menu.Item thumb={<Icon type="search" size="xxs" />}>搜索</Menu.Item>
                  </Menu.Group>
                  <Divider />
                  <Menu.Group>
                    <Menu.Heading className="my-menu-heading">功能设置</Menu.Heading>
                    <Menu.Item thumb={<Icon type="set" size="xxs" />}>设置</Menu.Item>
                    <Menu.Item thumb={<Icon type="cart" size="xxs" />}>购物车</Menu.Item>
                    <Menu.Item thumb={<Icon type="comments" size="xxs" />}>评论</Menu.Item>
                    <Menu.Item thumb={<Icon type="scan" size="xxs" />}>扫一扫</Menu.Item>
                  </Menu.Group>
                </Menu>
              </Paper>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
