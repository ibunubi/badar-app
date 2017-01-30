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
    
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    fetch('../../data/table-of-content.json')
    .then((res) => res.json())
    .then((data) => {
      this.setState({items: data, initialItems: data});
    });
  }
  handleChange(event) {
    let keyword = event.target.value.toLowerCase();
    
    let oriItems = this.state.initialItems;
    
    let filteredList = oriItems.filter((item) => {
      return (item.title.toLowerCase().search(keyword) > -1);
    });
    
    this.setState({
      items: filteredList
    });
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