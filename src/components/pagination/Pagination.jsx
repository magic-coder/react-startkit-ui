import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './scss';

export default class Pagination extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    // 分页的类型
    mode: PropTypes.oneOf([
      'button', 'number', 'point',
    ]),
    // 总页数
    total: PropTypes.number.isRequired,
    // 当前页数
    current: PropTypes.number.isRequired,
    // 是否隐藏数值
    simple: PropTypes.bool,
    // 上下页切换
    locale: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    prefixClassName: 'pagination',
    mode: 'button',
    simple: false,
    locale: {
      prevText: '上一页',
      nextText: '下一页',
    },
    onChange: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.state.current) {
      this.setState({
        current: nextProps.current,
      });
    }
  }

  /**
   * 切换 页数
   * 
   * @param {*} p 
   * @param {*} ev 
   */
  onChange(p, ev) {
    ev.stopPropagation();
    const { total } = this.props;
    if (p < 0 || p > total) {
      return;
    }

    this.setState({
      current: p,
    });

    if (this.props.onChange) {
      this.props.onChange(p);
    }
  }

  /**
   * 渲染 按钮模式的分页
   */
  renderButtonMode() {
    const { prefixClassName, total, locale, simple } = this.props;
    const { current } = this.state;

    const isPrexDisabed = current <= 1;
    const isNextDisabed = current >= total;

    const prevClasses = classNames(
      `${prefixClassName}__button__prev`,
      {
        [`${prefixClassName}__button__prev--disabled`]: isPrexDisabed,
      },
    );
    const nextClasses = classNames(
      `${prefixClassName}__button__next`,
      {
        [`${prefixClassName}__button__next--disabled`]: isNextDisabed,
      },
    );

    return (
      <div className={`${prefixClassName}__wrapper`}>
        <div className={prevClasses}>
          <a
            disabled={isPrexDisabed}
            onClick={(ev) => { this.onChange(current - 1, ev); }}
            role="button"
            tabIndex="-1"
          >
            {locale.prevText}
          </a>
        </div>
        {
          simple ? null : this.renderNumber()
        }
        <div className={nextClasses}>
          <a
            disabled={isNextDisabed}
            onClick={(ev) => { this.onChange(current + 1, ev); }}
            role="button"
            tabIndex="-1"
          >
            {locale.nextText}
          </a>
        </div>
      </div>
    );
  }

  /**
   * 渲染 数字模式的分页
   */
  renderNumberMode() {
    const { prefixClassName } = this.props;

    return (
      <div className={`${prefixClassName}__wrapper`}>
        {this.renderNumber()}
      </div>
    );
  }

  /**
   * 渲染 小圆点模式的分页
   */
  renderPointMode() {
    const { prefixClassName, total } = this.props;
    const { current } = this.state;

    const pageArr = [];
    for (let i = 0; i < total; i++) {
      const pointItemClasses = classNames(
        `${prefixClassName}__dot`,
        {
          [`${prefixClassName}__dot--active`]: (i + 1) === current,
        },
      );
      const pointItem = <div key={`dot-${i}`} className={pointItemClasses}><span /></div>;
      pageArr.push(pointItem);
    }

    return (
      <div className={`${prefixClassName}__wrapper ${prefixClassName}__wrapper--mode-dot`}>
        {pageArr}
      </div>
    );
  }

  /**
   * 分页的信息
   */
  renderNumber() {
    const { prefixClassName, total } = this.props;
    const { current } = this.state;

    return (
      <div className={`${prefixClassName}__number`}>
        <span className="active">{current}</span>
        <em className="sep">/</em>
        <span className="total">{total}</span>
      </div>
    );
  }

  render() {
    const {
      prefixClassName, className, style,
      mode,
    } = this.props;

    const pagiClasses = classNames(
      prefixClassName,
      className,
    );

    let markup;
    switch (mode) {
      case 'number':
        markup = this.renderNumberMode();
        break;
      case 'point':
        markup = this.renderPointMode();
        break;
      default :
        markup = this.renderButtonMode();
        break;
    }

    return (
      <div
        className={pagiClasses}
        style={style}
      >
        {markup}
      </div>
    );
  }
}
