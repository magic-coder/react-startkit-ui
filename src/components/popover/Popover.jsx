import React from 'react';
import PropTypes from 'prop-types';

import { Overlay } from '../mixins';

const Popover = (ComposedComponent) => {
  class PopoverCom extends React.Component {
    static propTypes = {
      visible: PropTypes.bool,
    }

    static defaultProps = {
      visible: false,
    }

    render() {
      console.log(ComposedComponent);
      console.log(this.props);
      const { visible } = this.props;

      return (
        <div>
          {visible ? <div className="popover">popover content ~~~~</div> : null}
          <ComposedComponent {...this.props} {...this.state} />
        </div>
      );
    }
  }

  return PopoverCom;
};

export default Popover(Overlay);
