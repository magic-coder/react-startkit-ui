import React from 'react';
import PropTypes from 'prop-types';

export default class PanelHeader extends React.Component {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  }

  static defaultProps = {}

  renderContent = () => {
    const { content } = this.props;
    return (
      <div className="panel__footer__content">{content}</div>
    );
  }

  renderFooter = () => {
    const { extra } = this.props;
    if (extra) {
      return (
        <div className="panel__footer__extra">{extra}</div>
      );
    }

    return '';
  }

  render() {
    const footerContent = this.renderContent();
    const footerExtra = this.renderFooter();
    return (
      <div className="panel__footer">
        {footerContent}
        {footerExtra}
      </div>
    );
  }
}
