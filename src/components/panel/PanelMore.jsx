import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class PanelMore extends React.Component {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.string,
    ]).isRequired, // PanelMore 内容
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired, // PanelMore 路由地址
    replace: PropTypes.bool, // PanelMore 内容是否居中
    center: PropTypes.bool, // PanelMore 内容是否居中
  }

  static defaultProps = {
    content: '更多',
    center: false,
    to: 'javascript:;', // PanelMore 内容是否居中
    replace: false, // PanelMore 内容是否居中
  }

  render() {
    const { content, center, to, replace } = this.props;
    const moreClassName = classNames('panel__more', {
      'panel__more--center': center,
    });
    return (
      <div className={moreClassName}>
        <Link href={to} data-replace={replace}>
          <div className="panel__more__body">{content}</div>
          <span className="panel__more__footer" />
        </Link>
      </div>
    );
  }
}
