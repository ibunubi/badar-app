import React, {Component} from 'react';

const Item = (props) => (
  <ul>
    {
      props.items.map((item, key) => {
        return <li key={key} onClick={props.onItemClick.bind(this,item)} >{item.title}</li>
      })
    }
  </ul>
)

class TableOfContent extends Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    fetch('../../data/table-of-content.json')
    .then((res) => res.json())
    .then((data) => {
      this.setState({items: data});
    });
  }
  handleClick = (item,event) => {
    console.log(item);
  }
  render() {
    return (
      <div>
        <h1>Yeoman</h1>
        <Item items={this.state.items} onItemClick={this.handleClick}/>
      </div>
    );
  }
}

export default TableOfContent;