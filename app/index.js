import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Hello, Counter, Unidirectional, Nerds} from './components';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';

import './style.css';


const Nav = () => (
  <div>
    <IndexLink activeClassName='active' to='/'>Home</IndexLink>&nbsp;
    <IndexLink activeClassName='active' to='/counter'>Counter</IndexLink>
    <IndexLink activeClassName='active' to='/unidirectional'>Unidirectional</IndexLink>
    <IndexLink activeClassName='active' to='/about'>About</IndexLink>
    <IndexLink 
    activeClassName='active' 
    to={{ 
      pathname: '/query', 
      query: { message: 'Hello from Route Query' } 
    }}>Route Query</IndexLink>
    <IndexLink activeClassName='active' to='/nerds'>Nerds</IndexLink>
  </div>
)

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

const About = (props) => (
  <div>
    <h3>Welcome to the About Page</h3>
    { props.params.name && <h2>Hello, {props.params.name}</h2>}
  </div>
)

const Query = (props) => (
  <h2>{props.location.query.message}</h2>
)

const Container = (props) => <div>
  <Nav />
  {props.children}
</div>

class Application extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Hello} />
          <Route path='/counter' component={Counter} />
          <Route path='/unidirectional' component={Unidirectional} />
          <Route path='/about(/:name)' component={About} />
          <Route path='/query' component={Query} />
          <Route path='/nerds' component={Nerds} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <Application name='Ali' />,
  document.getElementById('mount-point')
);