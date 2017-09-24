import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../icon';
import Marquee from '../marquee';

import './scss';

export default class NoticeBar extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    marqueeProps: PropTypes.object,
    // 提示类型
    mode: PropTypes.oneOf([
      'closable', 'link',
    ]),
    // notice 前的图标
    icon: PropTypes.element,
    // 点击关闭或者操作区域的回调函数
    onClick: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'notice-bar',
    marqueeProps: {
      loop: true,
      hoverToStop: false,
      leading: 500,
      trailing: 800,
      fps: 40,
    },
    mode: 'closable',
    icon: <Icon type="voice" size="xs" />,
    onClick: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };
  }

  onClick = () => {
    const { mode, onClick } = this.props;

    if (onClick) {
      onClick();
    }
    if (mode === 'closable') {
      this.setState({
        show: false,
      });
    }
  }

  render() {
    const {
      prefixClassName, className, style, children,
      marqueeProps, mode, icon, onClick,
    } = this.props;

    const noticeBarClasses = classNames(
      prefixClassName,
      className,
    );

    const extraProps = {};
    let operationDom = null;
    if (mode === 'closable') {
      operationDom = (
        <div className={`${prefixClassName}__operation`} onClick={this.onClick} role="button" tabIndex="0" aria-label="close">
          <Icon type="close" size="xs" />
        </div>
      );
    } else if (mode === 'link') {
      operationDom = (
        <div className={`${prefixClassName}__operation`} role="button" tabIndex="0" aria-label="go to detail">
          <Icon type="right" size="xs" />
        </div>
      );

      extraProps.onClick = onClick;
    }

    return !this.state.show ? null : (
      <div
        className={noticeBarClasses}
        style={style}
        {...extraProps}
        role="alert"
      >
        {
          !icon ? null : (
            <div className={`${prefixClassName}__icon`}>{icon}</div>
          )
        }
        <div className={`${prefixClassName}__content`}>
          <Marquee {...marqueeProps}>{children}</Marquee>
        </div>
        {operationDom}
      </div>
    );
  }
}
