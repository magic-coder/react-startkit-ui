import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class CarouselItem extends React.Component {
  static propTypes = {
    prefixClassName: PropTypes.string,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    style: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    prefixClassName: 'carousel__slide',
  }

  render() {
    const { prefixClassName, className, style, children } = this.props;

    const itemClasses = classNames(
      prefixClassName,
      className,
    );

    return (
      <div className={itemClasses} style={style}>
        {children}
      </div>
    );
  }
}
