import React, {Component} from 'react';

class Hello extends Component {
  render() {
    return (
      <div>
        <p>Props...</p>
        <h2>Hello World {this.props.name}! ! !</h2>
      </div>
    );
  }
}

export default Hello;