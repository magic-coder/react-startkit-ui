import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import initReactFastclick from 'react-fastclick';

import '@/style/base';

import Home from '@/views/home';
import NotFound from '@/views/404';

// reacr-fastclick
initReactFastclick();

export default class APP extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
