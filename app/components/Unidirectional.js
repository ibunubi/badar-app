import React, {Component} from 'react';

const List = (props) => (
    <ul>
      {
        props.items.map((item) => {
          return <li key={item}>{item}</li>
        })
      }
    </ul>
);

class Unidirectional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      initialItems: [
        "Apples",
        "Broccoli",
        "Chicken",
        "Duck",
        "Eggs",
        "Fish",
        "Granola",
        "Hash Browns"
      ]
    };

    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    // console.log(e.target.value);
    // console.log(this.refs.keyword.value);
    
    var filteredList = this.state.initialItems;
    var keyword = this.refs.keyword.value.toLowerCase();

    filteredList = filteredList.filter((item) => {
      return (item.toLowerCase().search(keyword) > -1);
    });
    
    console.log(filteredList);
    
    this.setState({
      items: filteredList
    });
  }
  componentWillMount(){
    this.setState({
      items: this.state.initialItems
    });
  }
  render() {
    return (
      <div id='unidirectional'>
        <p>Unidirectional...</p>
        <input type="text" name="searh" ref="keyword" onChange={this.onChange} placeholder="Find Your List"/>
        <List items={this.state.items} />
      </div>
    );
  }
}

export default Unidirectional;