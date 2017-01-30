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
    this.state = {items: [], initialItems: []};
    
    // this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    fetch('../../data/table-of-content.json')
    .then((res) => res.json())
    .then((data) => {
      this.setState({items: data, initialItems: data});
    });
  }
  handleChange(event) {
    let key = event.target.value.toLowerCase();
    console.log(key);
  }
  render() {
    return (
      <div>
        <header>
          <h2>Badar Desktop</h2>
          <input type="text" name="tocSearch" placeholder="Cari" onChange={this.handleChange} />
        </header>
        <div id="toc-list">
          <Item items={this.state.items}/>
        </div>
      </div>
    );
  }
}

export default TableOfContent;