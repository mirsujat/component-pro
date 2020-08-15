import React, { Component } from "react";

import "./App.css";

import MultiSelect from "./components/Todo/MultiSelect/MultiSelect";

class App extends Component {
  state = {
    options: ["Apple", "Banana", "Cherry", "Mango"],
  };
  render() {
    return (
      <div data-testid="app" className="app">
        <h1>Hello World</h1>
        <br></br>
        <MultiSelect isMultiple options={this.state.options}></MultiSelect>
      </div>
    );
  }
}

export default App;
