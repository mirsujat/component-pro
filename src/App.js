import React, { Component } from "react";

import "./App.css";

import MultiSelect from "./components/Todo/MultiSelect/MultiSelect";

const options = {
  options: [
    { id: 1, name: "Apple" },
    { id: 2, name: "Orange" },
    { id: 3, name: "Banana" },
    { id: 4, name: "Pineaple" },
  ],
};
class App extends Component {
  state = {
    ...options,
    selectedValues: [],
  };

  onSelect = () => {
    console.log("click from onSelect");
  };
  onRemove = () => {
    console.log("click from onRemove");
  };

  render() {
    return (
      <div data-testid="app" className="app">
        <h1>Hello World</h1>
        <br></br>
        <MultiSelect
          isMultiple
          options={this.state.options}
          selectedValues={this.state.selectedValues}
          onSelect={this.onSelect}
          onRemove={this.onRemove}
        ></MultiSelect>
      </div>
    );
  }
}

export default App;
