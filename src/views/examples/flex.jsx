import React from 'react';
import PropTypes from 'prop-types';

import Flex from '@/components/flex';
import WhiteSpace from '@/components/white-space';

import './scss/flex';

const PlaceHolder = (props) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,0.085)',
        color: '#666666',
        textAlign: 'center',
        height: '0.6rem',
        lineHeight: '0.6rem',
        width: '100%',
      }}
      {...props}
    >{props.children}</div>
  );
};
PlaceHolder.propTypes = {
  children: PropTypes.any,
};

export default class FlexExample extends React.Component {
  render() {
    return (
      <div className="page page__home">
        <div className="page__header">
          <div className="page__title">Flex</div>
          <div className="page__desc">弹性布局</div>
        </div>
        <div className="page__body">

          <div className="demo__preview">
            <div className="demo__preview__title">基本</div>
            <div className="demo__preview__content">
              <Flex className="flexbox__example">
                <Flex.Item><PlaceHolder>Item 1</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 2</PlaceHolder></Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex className="flexbox__example">
                <Flex.Item><PlaceHolder>Item 1</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 2</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 3</PlaceHolder></Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex className="flexbox__example">
                <Flex.Item><PlaceHolder>Item 1</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 2</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 3</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 4</PlaceHolder></Flex.Item>
              </Flex>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">对齐方式</div>
            <div className="demo__preview__content">
              <Flex
                className="flexbox__example"
                direction="row"
              >
                <Flex.Item><PlaceHolder>Item 1</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 2</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 3</PlaceHolder></Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                direction="row-reverse"
              >
                <Flex.Item><PlaceHolder>Item 1</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 2</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 3</PlaceHolder></Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                direction="column"
              >
                <Flex.Item><PlaceHolder>Item 1</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 2</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 3</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 4</PlaceHolder></Flex.Item>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                direction="column-reverse"
              >
                <Flex.Item><PlaceHolder>Item 1</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 2</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 3</PlaceHolder></Flex.Item>
                <Flex.Item><PlaceHolder>Item 4</PlaceHolder></Flex.Item>
              </Flex>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">换行</div>
            <div className="demo__preview__content">
              <div className="demo__preview__sub__title">不换行</div>
              <Flex
                className="flexbox__example"
                wrap="nowrap"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline">Item 2</PlaceHolder>
                <PlaceHolder className="inline">Item 3</PlaceHolder>
                <PlaceHolder className="inline">Item 4</PlaceHolder>
                <PlaceHolder className="inline">Item 5</PlaceHolder>
              </Flex>
              <div className="demo__preview__sub__title">换行</div>
              <Flex
                className="flexbox__example"
                wrap="wrap"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline">Item 2</PlaceHolder>
                <PlaceHolder className="inline">Item 3</PlaceHolder>
                <PlaceHolder className="inline">Item 4</PlaceHolder>
                <PlaceHolder className="inline">Item 5</PlaceHolder>
              </Flex>
              <div className="demo__preview__sub__title">倒序换行</div>
              <Flex
                className="flexbox__example"
                wrap="wrap-reverse"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline">Item 2</PlaceHolder>
                <PlaceHolder className="inline">Item 3</PlaceHolder>
                <PlaceHolder className="inline">Item 4</PlaceHolder>
                <PlaceHolder className="inline">Item 5</PlaceHolder>
              </Flex>
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">子元素在主轴上的对齐方式</div>
            <div className="demo__preview__content">
              <Flex
                className="flexbox__example"
                justify="start"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline">Item 2</PlaceHolder>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                justify="end"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline">Item 2</PlaceHolder>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                justify="center"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline">Item 2</PlaceHolder>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                justify="between"
              >
                <PlaceHolder className="inline inline--space-no">Item 1</PlaceHolder>
                <PlaceHolder className="inline inline--space-no">Item 2</PlaceHolder>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                justify="around"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline">Item 2</PlaceHolder>
              </Flex>
              <WhiteSpace />
            </div>
          </div>

          <div className="demo__preview">
            <div className="demo__preview__title">子元素在交叉轴上的对齐方式</div>
            <div className="demo__preview__content">
              <Flex
                className="flexbox__example"
                align="start"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline inline--small">Item 2</PlaceHolder>
                <PlaceHolder className="inline">Item 3</PlaceHolder>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                align="end"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline inline--small">Item 2</PlaceHolder>
                <PlaceHolder className="inline">Item 3</PlaceHolder>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                align="center"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline inline--small">Item 2</PlaceHolder>
                <PlaceHolder className="inline">Item 3</PlaceHolder>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                align="baseline"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline inline--small">Item 2</PlaceHolder>
                <PlaceHolder className="inline">Item 3</PlaceHolder>
              </Flex>
              <WhiteSpace />
              <Flex
                className="flexbox__example"
                align="stretch"
              >
                <PlaceHolder className="inline">Item 1</PlaceHolder>
                <PlaceHolder className="inline inline--small">Item 2</PlaceHolder>
                <PlaceHolder className="inline">Item 3</PlaceHolder>
              </Flex>
              <WhiteSpace />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
