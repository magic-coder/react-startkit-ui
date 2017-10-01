import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './scss';

export default class Steps extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    // 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态
    current: PropTypes.number,
    // 当前步骤状态
    status: PropTypes.oneOf([
      'wait', 'process', 'finish', 'error',
    ]),
    // step 尺寸
    size: PropTypes.oneOf([
      'small', 'large',
    ]),
    // step 样式
    direction: PropTypes.oneOf([
      'vertical', 'horizontal',
    ]),
    // step 标题位置
    labelPlacement: PropTypes.oneOf([
      'vertical', 'horizontal',
    ]),
  }

  static defaultProps = {
    prefixClassName: 'steps',
    current: 0,
    status: 'process',
    size: 'large',
    direction: 'vertical',
    labelPlacement: 'horizontal',
  }

  render() {
    const {
      prefixClassName, className, style, children,
      size, direction, labelPlacement, current, status,
    } = this.props;

    const stepsClasses = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--${size}`]: size,
        [`${prefixClassName}--${direction}`]: direction,
        [`${prefixClassName}--label-${labelPlacement}`]: labelPlacement,
      },
    );

    return (
      <div className={stepsClasses} style={style}>
        {
          children.map((child, index) => {
            // 没有子元素, 返回空
            if (!child) {
              return null;
            }

            const childProps = {
              stepNumber: index + 1,
              key: `step-${index + 1}`,
              ...child.props,
            };

            // 下项为错误项
            if (status === 'error' && index === current - 1) {
              childProps.className = 'step__next--error';
            }

            // 子元素没有设置 status 属性, 则取父元素的 status
            if (!child.props.status) {
              if (index === current) {
                childProps.status = status;
              } else if (index < current) {
                childProps.status = 'finish';
              } else {
                childProps.status = 'wait';
              }
            }

            return React.cloneElement(child, childProps);
          })
        }
      </div>
    );
  }
}
