import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Flex from '../flex';

import './scss';

export default class Grid extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    // 自定义 className
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    // 样式
    style: PropTypes.object,
    // 数据
    data: PropTypes.array,
    // 列数
    columnNum: PropTypes.number,
    // 是否有边框
    hasLine: PropTypes.bool,
    onClick: PropTypes.func,
    renderItem: PropTypes.any,
  }

  static defaultProps = {
    prefixClassName: 'grid',
    data: [], // {icon, text}
    columnNum: 4,
    hasLine: true,
    onClick: () => {},
    renderItem: null,
  }

  /**
   * 获取宫格内容
   * 
   * @params {*} rowCount 行/排数
   * @params {*} dataLength
   */  
  getRows = (rowCount, dataLength) => {
    const { prefixClassName, columnNum, data, renderItem, onClick } = this.props;
    const rowsArr = [];
    // 列数
    const rowWidth = `${100 / columnNum}%`;
    const colStyle = {
      width: rowWidth,
    };

    for (let i = 0; i < rowCount; i += 1) {
      const rowArr = [];
      for (let j = 0; j < columnNum; j += 1) {
        // 当前 item index
        const dataIndex = (i * columnNum) + j;
        let itemEle;
        if (dataIndex < dataLength) {
          // 有数据
          const ele = data && data[dataIndex];
          itemEle = (
            <Flex.Item
              key={`griditem-${dataIndex}`}
              className={`${prefixClassName}__item`}
              onClick={() => { onClick(ele, dataIndex); }}
              style={colStyle}
            >
              {this.renderItemContent(ele, dataIndex, columnNum, renderItem)}
            </Flex.Item>
          );
        } else {
          // 没有数据. 补全项
          itemEle = (
            <Flex.Item
              key={`griditem-${dataIndex}`}
              className={`${prefixClassName}__item ${prefixClassName}--null__item`}
              style={colStyle}
            >
              <div className={`${prefixClassName}__item__content`}>
                <div className={`${prefixClassName}__item__inner__content`} />
              </div>
            </Flex.Item>
          );
        }

        rowArr.push(itemEle);
      }
      rowsArr.push(<Flex justify="center" align="stretch" key={`gridline-${i}`}>{rowArr}</Flex>);
    }

    return rowsArr;
  }

  /**
   * 渲染宫格 item 内容
   * 
   * @params {*} dataItem 当前 item 数据
   * @params {*} index 序号
   * @params {*} columnNum 列数
   * @params {*} renderItem 自定义内容的创建函数
   * 
   * React.isValidElement 是否是 React 组件
   */
  renderItemContent = (dataItem, index, columnNum, renderItem) => {
    const { prefixClassName } = this.props;
    let itemEle;
    if (renderItem) {
      // 是自定义内容
      itemEle = renderItem(dataItem, index);
    } else if (dataItem) {
      // 不是自定义内容
      const { icon, text } = dataItem;
      itemEle = (
        <div className={`${prefixClassName}__item__inner__content column__num--${columnNum}`}>
          {
            React.isValidElement(icon) ? icon : (
              <img className={`${prefixClassName}__icon`} src={icon} alt={text} />
            )
          }
          <div className={`${prefixClassName}__text`}>{text}</div>
        </div>
      );
    }

    return (
      <div
        className={`${prefixClassName}__item__content`}
      >
        {itemEle}
      </div>
    );
  }

  render() {
    const {
      prefixClassName, className, style,
      data, columnNum, hasLine,
    } = this.props;
    const classes = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--line`]: hasLine,
      },
    );
    const dataLength = data ? data.length : 0;

    // 排/行数
    const rowCount = Math.ceil(dataLength / columnNum);
    // 宫格内容
    const rowsArr = this.getRows(rowCount, dataLength);
    const renderEle = rowsArr;

    return (
      <div className={classes} style={style}>
        {renderEle}
      </div>
    );
  }
}
