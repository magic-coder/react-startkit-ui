import React from 'react';
import PropTypes from 'prop-types';

export default class InkBar extends React.Component {
  static propTypes = {
    activeIndex: PropTypes.number.isRequired,
    tabsInkBarWidth: PropTypes.number.isRequired,
  }

  static defaultProps = {}

  render() {
    const { activeIndex, tabsInkBarWidth } = this.props;
    return (
      <div
        className="tabs__ink__bar"
        style={{
          display: 'block',
          width: `${tabsInkBarWidth}px`,
          WebkitTransform: `translate3d(${tabsInkBarWidth * activeIndex}px, 0px, 0px)`,
        }}
      />
    );
  }
}
