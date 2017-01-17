import React, {Component} from 'react';

const Item = (props) => (
  <ul>
    {
      props.items.map((item, key) => {
        return <li key={key}>{item.title}</li>
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
  handleClick() {
    alert('Hello world!');
  }
  render() {
    return (
      <div>
        <Item items={this.state.items}/>
      </div>
    );
  }
}

export default TableOfContent;