import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import dynamic from '@/utils/dynamic';

import '@/style/base';

import Home from '@/views/home';
import NotFound from '@/views/404';
import ScrollViewExample from '@/views/examples/scrollview';
import PaperExample from '@/views/examples/paper';
import PopoverExample from '@/views/examples/popover';
import MenuExample from '@/views/examples/menu';
import PaginationExample from '@/views/examples/pagination';
import MarqueeExample from '@/views/examples/marquee';
import NoticebarExample from '@/views/examples/noticebar';
import CarouselExample from '@/views/examples/carousel';
import StepsExample from '@/views/examples/steps';
import AbstractButtonExample from '@/views/examples/abstractbutton';
import ButtonExample from '@/views/examples/button';

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
            <Route exact path="/scrollview" component={ScrollViewExample} />
            <Route exact path="/abstract" component={AbstractButtonExample} />
            <Route exact path="/paper" component={PaperExample} />
            <Route exact path="/navbar" component={NavBarExample} />
            <Route exact path="/searchbar" component={SearchBarExample} />
            <Route exact path="/tabbar" component={TabBarExample} />
            <Route exact path="/popover" component={PopoverExample} />
            <Route exact path="/menu" component={MenuExample} />
            <Route exact path="/pagination" component={PaginationExample} />
            <Route exact path="/divider" component={DividerExample} />
            <Route exact path="/badge" component={BadgeExample} />
            <Route exact path="/marquee" component={MarqueeExample} />
            <Route exact path="/noticebar" component={NoticebarExample} />
            <Route exact path="/carousel" component={CarouselExample} />
            <Route exact path="/steps" component={StepsExample} />
            <Route exact path="/panel" component={PanelExample} />
            <Route exact path="/tabs" component={TabsExample} />
            <Route exact path="/accordion" component={AccordionExample} />
            <Route exact path="/icon" component={IconExample} />
            <Route exact path="/list" component={ListExample} />
            <Route exact path="/button" component={ButtonExample} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
