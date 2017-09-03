import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import initReactFastclick from 'react-fastclick';

import '@/style/base';

import Home from '@/views/home';
import FlexExample from '@/views/examples/flex';
import GridExample from '@/views/examples/grid';
import WhiteSpaceExample from '@/views/examples/whitespace';
import WingBlankExample from '@/views/examples/wingblank';
import PanelExample from '@/views/examples/panel';
import TabsExample from '@/views/examples/tabs';
import AccordionExample from '@/views/examples/accordion';
import IconExample from '@/views/examples/icon';
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
            <Route exact path="/flex" component={FlexExample} />
            <Route exact path="/grid" component={GridExample} />
            <Route exact path="/whitespace" component={WhiteSpaceExample} />
            <Route exact path="/wingblank" component={WingBlankExample} />
            <Route exact path="/panel" component={PanelExample} />
            <Route exact path="/tabs" component={TabsExample} />
            <Route exact path="/accordion" component={AccordionExample} />
            <Route exact path="/icon" component={IconExample} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
