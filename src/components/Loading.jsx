import React from 'react';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    timedOut: PropTypes.bool,
    pastDelay: PropTypes.bool,
    error: PropTypes.bool,
  }

  render() {
    const { isLoading, timedOut, pastDelay, error } = this.props;
    let loadingDom;
    if (isLoading) {
      // While our other component is loading...
      if (timedOut) {
        // In case we've timed out loading our other component.
        loadingDom = <div>Loader timed out!</div>;
      } else if (pastDelay) {
        // Display a loading screen after a set delay.
        loadingDom = <div>Loading...</div>;
      } else {
        // Don't flash "Loading..." when we don't need to.
        loadingDom = null;
      }
    } else if (error) {
      // If we aren't loading, maybe
      loadingDom = <div>Error! Component failed to load</div>;
    } else {
      // This case shouldn't happen... but we'll return null anyways.
      loadingDom = null;
    }
    return (
      <div>{ loadingDom }</div>
    );
  }
}
