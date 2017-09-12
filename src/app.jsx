import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '@/views/home';
import FlexExample from '@/views/examples/flex';
import GridExample from '@/views/examples/grid';
import WhiteSpaceExample from '@/views/examples/whitespace';
import WingBlankExample from '@/views/examples/wingblank';
import PanelExample from '@/views/examples/panel';
import NavBarExample from '@/views/examples/navbar';
import SearchBarExample from '@/views/examples/searchbar';
import DividerExample from '@/views/examples/divider';
import BadgeExample from '@/views/examples/badge';
import TabsExample from '@/views/examples/tabs';
import AccordionExample from '@/views/examples/accordion';
import IconExample from '@/views/examples/icon';
import ListExample from '@/views/examples/list';
import NotFound from '@/views/404';

import '@/style/base';

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
            <Route exact path="/navbar" component={NavBarExample} />
            <Route exact path="/searchbar" component={SearchBarExample} />
            <Route exact path="/divider" component={DividerExample} />
            <Route exact path="/badge" component={BadgeExample} />
            <Route exact path="/panel" component={PanelExample} />
            <Route exact path="/tabs" component={TabsExample} />
            <Route exact path="/accordion" component={AccordionExample} />
            <Route exact path="/icon" component={IconExample} />
            <Route exact path="/list" component={ListExample} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
