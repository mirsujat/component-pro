import React, { Component } from "react";

class TodoAccord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="accord">{this.props.children}</div>;
  }
}

export default TodoAccord;
