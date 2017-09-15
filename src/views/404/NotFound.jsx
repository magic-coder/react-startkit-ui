import React from 'react';
import { Link } from 'react-router-dom';

import './scss';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="page page__not__found">
        <section>
          <h1>404</h1>
          <p>你要找的页面不存在，<Link to="/">返回首页</Link></p>
        </section>
      </div>
    );
  }
}
