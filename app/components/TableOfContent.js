import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';

const Item = (props) => (
  <ul>
    {
      props.items.map((item, key) => {
        return <li key={key}><Link activeClassName='active' to={'/detail/'+key} dangerouslySetInnerHTML={{__html: item.title}}/></li>
      })
    }
  </ul>
)

class TableOfContent extends Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    
    // this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    fetch('../../data/table-of-content.json')
    .then((res) => res.json())
    .then((data) => {
      this.setState({items: data});
    });
  }
  render() {
    return (
      <div>
        <h1>Table of Content</h1>
        <Item items={this.state.items}/>
      </div>
    );
  }
}

export default TableOfContent;