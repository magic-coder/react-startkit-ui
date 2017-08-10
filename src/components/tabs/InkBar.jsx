import React from 'react';
import PropTypes from 'prop-types';

export default class InkBar extends React.Component {
  static propTypes = {
    animated: PropTypes.bool,
    activeIndex: PropTypes.number.isRequired,
    tabsInkBarWidth: PropTypes.number.isRequired,
  }

  static defaultProps = {
    animated: false, // 是否是运动模式
  }

  componentDidMount() {
    if (this.props.animated) {
      setTimeout(() => {
        this.inkBarElement.classList.add('tabs__ink__bar--animated');
      }, 0);
    }
  }

  render() {
    const { activeIndex, tabsInkBarWidth } = this.props;

    return (
      <div
        className="tabs__ink__bar"
        ref={(ele) => { this.inkBarElement = ele; }}
        style={{
          display: 'block',
          width: `${tabsInkBarWidth}px`,
          WebkitTransform: `translate3d(${tabsInkBarWidth * activeIndex}px, 0px, 0px)`,
        }}
      />
    );
  }
}
