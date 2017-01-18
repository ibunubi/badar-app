import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Welcome,TableOfContent} from './components';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';

import './style.css';


const Nav = () => (
  <div>
    <IndexLink activeClassName='active' to='/'>Home</IndexLink>&nbsp;
    <IndexLink activeClassName='active' to='/table-of-content'>Table of Content</IndexLink>
  </div>
)

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

const Container = (props) => <div>
  <Nav />
  <nav>
    <TableOfContent/>
  </nav>
  {props.children}
</div>

class Application extends Component {
  render() {
    return (
      <div id="wrap">
        <div id="main">
          <Router history={hashHistory}>
            <Route path='/' component={Container}>
              <IndexRoute component={Welcome} />
              <Route path='/table-of-content' component={TableOfContent} />
              <Route path='*' component={NotFound} />
            </Route>
          </Router>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Application name='Ali' />,
  document.getElementById('mount-point')
);