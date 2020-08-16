import React, { Component } from "react";

import "./App.css";

import MultiSelect from "./components/Todo/MultiSelect/MultiSelect";

class App extends Component {
  state = {
    options: [
      { id: 1, value: "Apple" },
      { id: 2, value: "Orange" },
      { id: 3, value: "Banana" },
      { id: 4, value: "Pineaple" },
    ],
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
