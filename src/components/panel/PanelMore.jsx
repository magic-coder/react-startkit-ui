import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class PanelMore extends React.Component {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired, // PanelMore 内容
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired, // PanelMore 链接地址
    center: PropTypes.bool, // PanelMore 内容是否居中
  }

  static defaultProps = {
    content: '更多', // PanelMore 内容
    center: false, // PanelMore 内容是否居中
    to: 'javascript:;',
  }

  renderPanelMoreContent = () => {
    const { content, to } = this.props;
    if (typeof content === 'object') {
      return content;
    }
    return (
      <a href={to}>
        <div className="panel__more__body">{content}</div>
        <span className="panel__more__footer" />
      </a>
    );
  }

  render() {
    const { center, content } = this.props;
    const moreClassName = classNames('panel__more', {
      'panel__more--center': center,
      'panel__more--route': (typeof content === 'object'),
    });
    const panelMoreContent = this.renderPanelMoreContent();
    return (
      <div className={moreClassName}>
        {panelMoreContent}
      </div>
    );
  }
}
