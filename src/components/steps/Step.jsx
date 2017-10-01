import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../icon';

export default class Step extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    // 步骤序号
    stepNumber: PropTypes.number,
    // 当前步骤状态
    status: PropTypes.oneOf([
      'wait', 'process', 'finish', 'error',
    ]),
    // 步骤标题
    title: PropTypes.any,
    // 步骤描述, 可选
    description: PropTypes.any,
    // 步骤图标, 可选
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  }

  static defaultProps = {
    prefixClassName: 'step',
  }

  /**
   * 渲染 HeaderInner 节点内容
   */
  renderHeaderInnerNode() {
    const {
      prefixClassName, stepNumber, status = 'wait', icon,
    } = this.props;

    let innerContent;
    if (icon || status === 'finish' || status === 'error') {
      if (icon) {
        innerContent = typeof icon === 'string' ? <Icon type={icon} size="md" /> : icon;
      } else {
        const statusIcon = status === 'finish' ? 'check-circle' : 'cross-circle';
        innerContent = <Icon type={statusIcon} size="md" />;
      }
    } else {
      innerContent = stepNumber;
    }

    return (
      <div className={`${prefixClassName}__header__inner`}>
        {innerContent}
      </div>
    );
  }

  render() {
    const {
      prefixClassName, className, style,
      status = 'wait', title, description, icon,
    } = this.props;

    const stepsClasses = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--${status}`]: status,
        [`${prefixClassName}__custom`]: icon, // 自定义Icon
      },
    );

    return (
      <div className={stepsClasses} style={style}>
        <div className={`${prefixClassName}__tail`}><i /></div>
        <div className={`${prefixClassName}__header`}>
          {this.renderHeaderInnerNode()}
        </div>
        <div className={`${prefixClassName}__body`}>
          <div className={`${prefixClassName}__title`}>{title}</div>
          <div className={`${prefixClassName}__description`}>{description}</div>
        </div>
      </div>
    );
  }
}
