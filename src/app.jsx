import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import dynamic from '@/utils/dynamic';

import '@/style/base';

import Home from '@/views/home';
import NotFound from '@/views/404';
import PopoverExample from '@/views/examples/popover';

const FlexExample = dynamic({
  loader: () => { return import('@/views/examples/flex'); },
});
const GridExample = dynamic({
  loader: () => { return import('@/views/examples/grid'); },
});
const WhiteSpaceExample = dynamic({
  loader: () => { return import('@/views/examples/whitespace'); },
});
const WingBlankExample = dynamic({
  loader: () => { return import('@/views/examples/wingblank'); },
});
const PanelExample = dynamic({
  loader: () => { return import('@/views/examples/panel'); },
});
const NavBarExample = dynamic({
  loader: () => { return import('@/views/examples/navbar'); },
});
const SearchBarExample = dynamic({
  loader: () => { return import('@/views/examples/searchbar'); },
});
const TabBarExample = dynamic({
  loader: () => { return import('@/views/examples/tabbar'); },
});
const DividerExample = dynamic({
  loader: () => { return import('@/views/examples/divider'); },
});
const BadgeExample = dynamic({
  loader: () => { return import('@/views/examples/badge'); },
});
const TabsExample = dynamic({
  loader: () => { return import('@/views/examples/tabs'); },
});
const AccordionExample = dynamic({
  loader: () => { return import('@/views/examples/accordion'); },
});
const IconExample = dynamic({
  loader: () => { return import('@/views/examples/icon'); },
});
const ListExample = dynamic({
  loader: () => { return import('@/views/examples/list'); },
});

export default class APP extends React.Component {
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
            <Route exact path="/tabbar" component={TabBarExample} />
            <Route exact path="/popover" component={PopoverExample} />
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
