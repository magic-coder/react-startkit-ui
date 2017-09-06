import React from 'react';
import List from '@/components/list';
import Divider from '@/components/divider';
import WhiteSpace from '@/components/white-space';

import thumb1 from '@/assets/images/thumb1.png';
import thumb2 from '@/assets/images/thumb2.png';
import thumb3 from '@/assets/images/thumb3.png';
import thumb4 from '@/assets/images/thumb4.png';

export default class ListExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisabled: false,
    };
  }

  toggleDisabled = () => {
    this.setState({
      isDisabled: !this.state.isDisabled,
    });
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">List</div>
          <div className="page__desc">列表</div>
        </div>
        <div className="page__body">
          <List renderHeader="基本样式" className="my-list">
            <List.Item extra={'有问题？'}>帮助中心</List.Item>
            <Divider shallowInset />
            <List.Item extra={'1.0.2'}>版本</List.Item>
          </List>

          <WhiteSpace />
          <List renderHeader="标题在内" className="my-list" inside>
            <List.Item extra={'有问题？'}>帮助中心</List.Item>
            <Divider shallowInset />
            <List.Item extra={'1.0.2'}>版本</List.Item>
          </List>
          <WhiteSpace />

          <List renderHeader="没有背景" className="my-list" hasLine={false} transparent>
            <List.Item extra={'额外内容'}>标题 - 没有背景</List.Item>
            <Divider shallowInset />
            <List.Item extra={'额外内容'}>标题 - 没有背景</List.Item>
            <Divider shallowInset />
          </List>

          <List renderHeader={() => { return 'Arrow 箭头'; }} className="my-list">
            <List.Item
              thumb={thumb1}
              multipleLine
              extra={'向右'}
              arrow="horizontal"
            >
              这里标题
              <List.Item.Brief className="my-brief">谷歌AI项目在中国开启招聘</List.Item.Brief>
            </List.Item>
            <Divider deepInset />
            <List.Item
              thumb={thumb2}
              multipleLine
              extra={'向上'}
              arrow="down"
            >
              这里标题
              <List.Item.Brief className="my-brief">谷歌AI项目在中国开启招聘：团队兼具技术研发任务</List.Item.Brief>
            </List.Item>
            <Divider deepInset />
            <List.Item
              thumb={thumb3}
              multipleLine
              extra={'向下'}
              arrow="up"
            >
              这里标题
              <List.Item.Brief className="my-brief">谷歌AI项目在中国开启招聘：团队兼具技术研发任务</List.Item.Brief>
            </List.Item>
            <Divider deepInset />
            <List.Item
              thumb={thumb4}
              multipleLine
              extra={'Empty'}
              arrow="empty"
            >
              这里标题
              <List.Item.Brief className="my-brief">谷歌AI项目在中国开启招聘：团队兼具技术研发任务</List.Item.Brief>
            </List.Item>
          </List>

          <List renderHeader={() => { return '对齐方式'; }} className="my-list">
            <List.Item
              thumb={thumb1}
              multipleLine
              extra={'居中'}
              arrow="horizontal"
              align="middle"
            >
              这里标题
              <List.Item.Brief className="my-brief">谷歌AI项目在中国开启招聘</List.Item.Brief>
            </List.Item>
            <Divider deepInset />
            <List.Item
              thumb={thumb2}
              multipleLine
              extra={'头部'}
              arrow="horizontal"
              align="top"
            >
              这里标题
              <List.Item.Brief className="my-brief">谷歌AI项目在中国开启招聘：团队兼具技术研发任务</List.Item.Brief>
            </List.Item>
            <Divider deepInset />
            <List.Item
              thumb={thumb3}
              multipleLine
              extra={'底部'}
              arrow="horizontal"
              align="bottom"
            >
              这里标题
              <List.Item.Brief className="my-brief">谷歌AI项目在中国开启招聘：团队兼具技术研发任务</List.Item.Brief>
            </List.Item>
          </List>

          <List renderHeader={() => { return '不换行/换行内容'; }} className="my-list">
            <List.Item
              multipleLine
              extra={'不换行'}
              align="middle"
            >
              复联4重返苏格兰 星云分享片场照。第三部曾在苏格兰拍摄 剧情将会如何串联？
            </List.Item>
            <Divider shallowInset />
            <List.Item
              wrap
              multipleLine
              extra={'换行'}
            >
              ofo小黄车信用免押金城市达14个：需芝麻分650以上
            </List.Item>
            <Divider shallowInset />
            <List.Item
              wrap
              multipleLine
              extra={'换行'}
              align="top"
            >
              小米A1手机开箱：背部新增Android One信仰Logo
            </List.Item>
          </List>

          <List renderHeader={() => { return '其他'; }} className="my-list">
            <List.Item
              thumb={thumb1}
              multipleLine
              extra={'居中'}
              arrow="horizontal"
              align="middle"
              disabled={this.state.isDisabled}
              onClick={this.toggleDisabled}
            >
              可用/禁用
            </List.Item>
            <Divider deepInset />
            <List.Item
              thumb={thumb2}
            >
              <select
                defaultValue="1"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  border: 'none',
                  padding: '0',
                  backgroundColor: 'transparent',
                }}
              >
                <option value="1">HTML select 元素</option>
                <option value="2" disabled>可不选的选项</option>
                <option value="3">选项 3</option>
                <option value="4">选项 4</option>
              </select>
            </List.Item>
          </List>
        </div>
      </div>
    );
  }
}
