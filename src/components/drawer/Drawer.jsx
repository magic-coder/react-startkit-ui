import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';

import './scss';

export default class Drawer extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
    overlayStyle: PropTypes.object,
    sidebarStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    sidebar: PropTypes.any,
    // 抽屉所在位置
    position: PropTypes.oneOf([
      'left', 'right', 'top', 'bottom',
    ]),
    // 开关状态
    open: PropTypes.bool,
    // 是否显示遮罩层
    overlay: PropTypes.bool,
    // 是否嵌入到正常文档流里
    docked: PropTypes.bool,
    onOpenChange: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'drawer',
    position: 'left',
    overlayStyle: {},
    open: false,
    overlay: true,
    docked: false,
    onOpenChange: () => {},
  }

  handleOpanChange() {
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      setTimeout(() => {
        onOpenChange(false);
      }, 0);
    }
  }

  render() {
    const {
      prefixClassName, className, children, style, overlayStyle, sidebarStyle, contentStyle,
      sidebar, open, docked, overlay, position,
    } = this.props;

    const drawerClassed = classNames(
      prefixClassName,
      className,
      {
        [`${prefixClassName}--open`]: open,
        [`${prefixClassName}--docked`]: docked,

        [`${prefixClassName}--left`]: position === 'left',
        [`${prefixClassName}--right`]: position === 'right',
        [`${prefixClassName}--top`]: position === 'top',
        [`${prefixClassName}--bottom`]: position === 'bottom',
      },
    );

    return (
      <div
        className={drawerClassed}
        style={style}
      >
        {
          !overlay ? null : (
            <Animate
              component=""
              showProp="data-show"
              transitionName="fade"
            >
              <div
                className={`${prefixClassName}__overlay`}
                style={overlayStyle}
                onClick={() => { this.handleOpanChange(); }}
                data-show={open}
                role="button"
                tabIndex="0"
              />
            </Animate>
          )
        }
        {
          !sidebar ? null : (
            <div className={`${prefixClassName}__sidebar`} style={sidebarStyle}>
              {sidebar}
            </div>
          )
        }
        <div className={`${prefixClassName}__content`} style={contentStyle}>
          {children}
        </div>
      </div>
    );
  }
}
