import React, {Component} from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {count:0};

    this.incrementCount = this.incrementCount.bind(this);
  }
  incrementCount() {
    this.setState({
      count: this.state.count+1
    });
  }
  render() {
    return (
      <div className='counter'>
        <p>Counter/Param...</p>
        <div className='number'>{this.state.count}</div>
        <div>
          <button onClick={this.incrementCount}>Increment</button>
        </div>
      </div>
    );
  }
}

export default Counter;