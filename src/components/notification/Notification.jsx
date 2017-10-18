import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import createChainedFunction from '@/utils/createChainedFunction';

import Notice from './Notice';

import './scss';

let seed = 0;
const now = Date.now();

/**
 * 获取唯一表示
 * 
 * @returns 
 */
function getUuid() {
  return `Notification_${now}_${seed++}`;
}

export default class Notification extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.any,
    transitionName: PropTypes.string,
    animation: PropTypes.oneOfType([
      PropTypes.string, PropTypes.object,
    ]),
  };

  static defaultProps = {
    prefixClassName: 'notification',
    animation: 'fade',
    style: {
      top: 60,
      left: '50%',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      notices: [],
    };
  }

  /**
   * 获取 运动的 className
   * 
   * @returns 
   * @memberof Notification
   */
  getTransitionName() {
    const { prefixClassName, transitionName, animation } = this.props;
    let transitionClassName = transitionName;

    if (!transitionClassName && animation) {
      transitionClassName = `${prefixClassName}-${animation}`;
    }

    return transitionClassName;
  }

  /**
   * 增加 信息通知
   * 
   * @param {any} notice 
   * @memberof Notification
   */
  add = (notice) => {
    const key = notice.key || getUuid();
    notice.key = key;

    this.setState((previousState) => {
      const notices = previousState.notices;
      // 信息通知队列中, 同一 key 值的信息列表
      const sameKeyNotices = notices.filter((n) => {
        return n.key === key;
      });

      // 不存在. 添加信息到队列中
      if (!sameKeyNotices.lengh) {
        return {
          notices: notices.concat(notice),
        };
      }

      return {
        notices,
      };
    });
  }

  /**
   * 删除 信息通知
   * 
   * @param {any} key 
   * @memberof Notification
   */
  remove = (key) => {
    this.setState((previousState) => {
      return {
        notices: previousState.notices.filter((n) => {
          return n.key !== key;
        }),
      };
    });
  }

  render() {
    const { prefixClassName, className, style } = this.props;
    const { notices } = this.state;

    const notificationClasses = classNames(
      prefixClassName,
      className,
    );

    // 信息列表
    const noticeNodes = notices.map((notice) => {
      // 关闭回掉函数
      const noticeOnCloseCallback = createChainedFunction(() => {
        this.remove(notice.key);
      }, notice.onClose);

      return (
        <Notice
          prefixClassName={prefixClassName}
          {...notice}
          onClose={noticeOnCloseCallback}
        >
          {notice.content}
        </Notice>
      );
    });

    return (
      <div
        className={notificationClasses}
        style={style}
      >
        <Animate transitionName={this.getTransitionName()}>{noticeNodes}</Animate>
      </div>
    );
  }
}

/**
 * 弹窗单例
 * 
 * @param {any} [properties={}] 
 * @param {any} [callback=() => {}] 
 */
Notification.newInstance = function newNotificationInstance(properties = {}, callback = () => {}) {
  const { getContainer, ...props } = properties;
  // 弹窗父节点. 没有设置默认为 body
  let div;
  if (getContainer) {
    div = getContainer();
  } else {
    div = document.createElement('div');
    document.body.appendChild(div);
  }

  // 是否已实例化
  let called = false;
  /**
   * 弹窗对象 函数
   * 
   * @param {any} notification 信息通知组件
   */
  function noticeRef(notification) {
    if (called) {
      return;
    }
    called = true;
    callback({
      component: notification,
      notice(noticeProps) {
        notification.add(noticeProps);
      },
      removeNotice(key) {
        notification.remove(key);
      },
      destroy() {
        ReactDOM.unmountComponentAtNode(div);
        if (!getContainer) {
          document.body.removeChild(div);
        }
      },
    });
  }

  ReactDOM.render(<Notification {...props} ref={noticeRef} />, div);
};
