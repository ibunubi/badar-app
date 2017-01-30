import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Welcome,TableOfContent,Content} from './components';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';

import './style.css';

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

const Container = (props) => <div>
  <nav>
    <TableOfContent/>
  </nav>
  <div id="content">
    {props.children}
  </div>
</div>

class Application extends Component {
  render() {
    return (
      <div id="main">
        <Router history={hashHistory}>
          <Route path='/' component={Container}>
            <IndexRoute component={Welcome} />
            <Route path="/detail/:contentId" component={Content}/>
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <Application name='Ali' />,
  document.getElementById('mount-point')
);