import React from 'react';

import SearchBar from '@/components/search-bar';
import Icon from '@/components/icon';
import WhiteSpace from '@/components/white-space';

export default class SearchBarExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchRightText: '取消',
      searchRightAction: 'cancel',
      searchDefaultValue: 'React Native',
      searchValue: 'React',
      focused: false,
    };
  }

  onWatchSearchValue = (value) => {
    const isEmpty = value.trim() === '';
    this.setState({
      searchRightText: isEmpty ? '取消' : '搜索',
      searchRightAction: isEmpty ? 'cancel' : 'search',
    });
  }

  handleRightClick = (value) => {
    if (this.state.searchRightAction === 'cancel') {
      alert('取消搜索');
    } else {
      alert(`搜索: ${value}`);
    }
  }

  handleSubmit = (value) => {
    if (this.state.searchRightAction === 'search') {
      alert(`搜索: ${value}`);
    }
  }

  handleChange = (value) => {
    this.onWatchSearchValue(value);
  }

  handleReset = (value) => {
    this.onWatchSearchValue(value);
  }

  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">SearchBar</div>
          <div className="page__desc">搜索栏</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">模式</div>
            <div className="demo__preview__content">
              <SearchBar
                className="my-search-bar"
                mode="light"
                onLeftClick={() => {
                  const msg = '点了返回';
                  alert(msg);
                  console.log(msg);
                }}
              />
              <WhiteSpace />
              <SearchBar
                className="my-search-bar"
                mode="dark"
                onLeftClick={() => {
                  const msg = '点了返回';
                  alert(msg);
                  console.log(msg);
                }}
              />
            </div>
          </div>
          <WhiteSpace size="xl" />

          <div className="demo__preview">
            <div className="demo__preview__title">默认值</div>
            <div className="demo__preview__content">
              <SearchBar
                className="my-search-bar"
                mode="light"
                defaultValue="React Native"
                onLeftClick={() => {
                  const msg = '点了返回';
                  alert(msg);
                  console.log(msg);
                }}
                onFocus={(value) => { console.log('获取焦点，当前输入框的值为：', value); }}
                onBlur={(value) => { console.log('失去焦点，当前输入框的值为：', value); }}
                onInput={(value) => { console.log('当前输入框的值为：', value); }}
                onReset={(value) => { console.log('重置了输入框的值，', '当前输入框的值为：', value); }}
                onSubmit={(value) => { console.log('点了回车提交', '当前输入框的值为：', value); alert('onSubmit'); }}
              />
              <WhiteSpace />
              <SearchBar
                className="my-search-bar"
                mode="dark"
                value="React"
                onLeftClick={() => {
                  const msg = '点了返回';
                  alert(msg);
                  console.log(msg);
                }}
                onFocus={(value) => { console.log('获取焦点，当前输入框的值为：', value); }}
                onBlur={(value) => { console.log('失去焦点，当前输入框的值为：', value); }}
                onInput={(value) => { console.log('当前输入框的值为：', value); }}
                onReset={(value) => { console.log('重置了输入框的值，', '当前输入框的值为：', value); }}
                onSubmit={(value) => { console.log('点了回车提交', '当前输入框的值为：', value); alert('onSubmit'); }}
              />
            </div>
          </div>
          <WhiteSpace size="xl" />

          <div className="demo__preview">
            <div className="demo__preview__title">手动获取光标</div>
            <div className="demo__preview__content">
              <SearchBar
                className="my-search-bar"
                mode="dark"
                focused={this.state.focused}
                onFocus={() => {
                  this.setState({
                    focused: false,
                  });
                }}
              />
              <WhiteSpace />
              <div style={{ padding: '0.32rem', textAlign: 'center' }}>
                <a
                  href="javascript:;"
                  onClick={() => {
                    console.log('点击获取光标');
                    this.setState({
                      focused: true,
                    });
                  }}
                >点击获取光标</a>
              </div>
            </div>
          </div>
          <WhiteSpace size="xl" />

          <div className="demo__preview">
            <div className="demo__preview__title">输入框自定义内容</div>
            <div className="demo__preview__content">
              <SearchBar
                className="my-search-bar"
                mode="light"
                rightInputContent={[
                  <Icon
                    key="0"
                    type="microphone"
                    size="xxs"
                    style={{ marginRight: '0.3rem' }}
                    onClick={() => {
                      const msg = '点了语音输入';
                      alert(msg);
                      console.log(msg);
                    }}
                  />,
                  <Icon
                    key="1"
                    type="scan"
                    size="xxs"
                    onClick={() => {
                      const msg = '点了扫码';
                      alert(msg);
                      console.log(msg);
                    }}
                  />,
                ]}
              />
              <WhiteSpace />
              <SearchBar
                className="my-search-bar"
                mode="dark"
                rightInputContent={[
                  <Icon
                    key="0"
                    type="microphone"
                    size="xxs"
                    style={{ marginRight: '0.25rem' }}
                    onClick={() => {
                      const msg = '点了语音输入';
                      alert(msg);
                      console.log(msg);
                    }}
                  />,
                  <Icon
                    key="1"
                    type="scan"
                    size="xxs"
                    onClick={() => {
                      const msg = '点了扫码';
                      alert(msg);
                      console.log(msg);
                    }}
                  />,
                ]}
              />
            </div>
          </div>
          <WhiteSpace size="xl" />

          <div className="demo__preview">
            <div className="demo__preview__title">两边自定义</div>
            <div className="demo__preview__content">
              <SearchBar
                className="my-search-bar"
                mode="light"
                onLeftClick={() => {
                  const msg = '点了左边';
                  alert(msg);
                  console.log(msg);
                }}
                onRightClick={(value) => {
                  const msg = `点了右边 =>> ${value}`;
                  alert(msg);
                  console.log(msg);
                }}
                onFocus={(value) => { console.log('获取焦点，当前输入框的值为：', value); }}
                onBlur={(value) => { console.log('失去焦点，当前输入框的值为：', value); }}
                onInput={(value) => { console.log('当前输入框的值为：', value); }}
                onReset={(value) => { console.log('重置了输入框的值，', '当前输入框的值为：', value); }}
              />
              <WhiteSpace />
              <SearchBar
                className="my-search-bar"
                mode="light"
                leftContent={[
                  <Icon key="0" type="home" />,
                ]}
                onLeftClick={() => {
                  const msg = '点了左边';
                  alert(msg);
                  console.log(msg);
                }}
                rightContent={[
                  <Icon key="0" type="search" />,
                ]}
                onRightClick={(value) => {
                  const msg = `点了右边 =>> ${value}`;
                  alert(msg);
                  console.log(msg);
                }}
                onFocus={(value) => { console.log('获取焦点，当前输入框的值为：', value); }}
                onBlur={(value) => { console.log('失去焦点，当前输入框的值为：', value); }}
                onInput={(value) => { console.log('当前输入框的值为：', value); }}
                onReset={(value) => { console.log('重置了输入框的值，', '当前输入框的值为：', value); }}
              />
              <WhiteSpace />
              <SearchBar
                className="my-search-bar"
                mode="light"
                leftContent={false}
                rightContent={false}
                onFocus={(value) => { console.log('获取焦点，当前输入框的值为：', value); }}
                onBlur={(value) => { console.log('失去焦点，当前输入框的值为：', value); }}
                onInput={(value) => { console.log('当前输入框的值为：', value); }}
                onReset={(value) => { console.log('重置了输入框的值，', '当前输入框的值为：', value); }}
              />
              <WhiteSpace />
              <SearchBar
                className="my-search-bar"
                mode="light"
                leftContent={false}
                rightContent={this.state.searchRightText}
                onRightClick={(value) => {
                  this.handleRightClick(value);
                }}
                onChange={(value) => {
                  this.handleChange(value);
                }}
                onReset={(value) => {
                  this.handleReset(value);
                }}
                onSubmit={(value) => {
                  this.handleSubmit(value);
                }}
              />
            </div>
          </div>
          <WhiteSpace size="xl" />

        </div>
      </div>
    );
  }
}
