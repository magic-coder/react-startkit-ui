import React from 'react';
import WingBlank from '@/components/wing-blank';
import WhiteSpace from '@/components/white-space';
import Icon from '@/components/icon';
import Pagination from '@/components/pagination';

import './scss/pagination';

export default class PaginationExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textCurrent: 2,
      customCurrent: 2,
      simpleCurrent: 1,
      numberCurrent: 2,
      pointCurrent: 1,
    };
  }

  render() {
    return (
      <div className="page page__pagination">
        <div className="page__header">
          <div className="page__title">Pagination</div>
          <div className="page__desc">分页器</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">文字按钮</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Pagination
                  className="my-pagination"
                  total={5}
                  current={this.state.textCurrent}
                  onChange={(currentPage) => {
                    console.log('当前页数是 =>>', currentPage);
                    this.setState({
                      textCurrent: currentPage,
                    });
                  }}
                />
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">自定义按钮</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Pagination
                  className="my-pagination"
                  locale={{
                    prevText: 'Prev',
                    nextText: 'Next',
                  }}
                  total={5}
                  current={this.state.customCurrent}
                  onChange={(currentPage) => {
                    console.log('当前页数是 =>>', currentPage);
                    this.setState({
                      customCurrent: currentPage,
                    });
                  }}
                />
                <WhiteSpace size="lg" />
                <Pagination
                  className="pagination__with-icon"
                  locale={{
                    prevText: (<span className="arrow-align"><Icon type="left" />上一步</span>),
                    nextText: (<span className="arrow-align">下一步<Icon type="right" /></span>),
                  }}
                  total={5}
                  current={this.state.customCurrent}
                  onChange={(currentPage) => {
                    console.log('当前页数是 =>>', currentPage);
                    this.setState({
                      customCurrent: currentPage,
                    });
                  }}
                />
                <WhiteSpace size="lg" />
                <Pagination
                  className="my-pagination"
                  locale={{
                    prevText: (<span className="arrow-align"><Icon type="left" /></span>),
                    nextText: (<span className="arrow-align"><Icon type="right" /></span>),
                  }}
                  total={5}
                  current={this.state.customCurrent}
                  onChange={(currentPage) => {
                    console.log('当前页数是 =>>', currentPage);
                    this.setState({
                      customCurrent: currentPage,
                    });
                  }}
                />
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">没有数字</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Pagination
                  className="my-pagination"
                  simple
                  total={5}
                  current={this.state.simpleCurrent}
                  onChange={(currentPage) => {
                    console.log('当前页数是 =>>', currentPage);
                    this.setState({
                      simpleCurrent: currentPage,
                    });
                  }}
                />
                <WhiteSpace size="lg" />
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">小圆点模式</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Pagination
                  className="my-pagination"
                  total={5}
                  current={this.state.pointCurrent}
                  mode="point"
                />
                <WhiteSpace size="lg" />
                <p style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      if (this.state.pointCurrent === 1) {
                        return;
                      }

                      this.setState({
                        pointCurrent: this.state.pointCurrent - 1,
                      });
                    }}
                  >
                    上一个
                  </button>
                  <button
                    onClick={() => {
                      if (this.state.pointCurrent === 5) {
                        return;
                      }

                      this.setState({
                        pointCurrent: this.state.pointCurrent + 1,
                      });
                    }}
                  >
                    下一个
                  </button>
                </p>
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

          <div className="demo__preview">
            <div className="demo__preview__title">纯数字模式</div>
            <div className="demo__preview__content demo__preview__content--bg">
              <WingBlank>
                <WhiteSpace size="lg" />
                <Pagination
                  className="my-pagination"
                  total={10}
                  current={this.state.numberCurrent}
                  mode="number"
                />
                <WhiteSpace size="lg" />
                <p style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      if (this.state.numberCurrent === 1) {
                        return;
                      }

                      this.setState({
                        numberCurrent: this.state.numberCurrent - 1,
                      });
                    }}
                  >
                    上一页
                  </button>
                  <button
                    onClick={() => {
                      if (this.state.numberCurrent === 10) {
                        return;
                      }

                      this.setState({
                        numberCurrent: this.state.numberCurrent + 1,
                      });
                    }}
                  >
                    下一页
                  </button>
                </p>
              </WingBlank>
            </div>
          </div>
          <WhiteSpace size="lg" />

        </div>
      </div>
    );
  }
}
