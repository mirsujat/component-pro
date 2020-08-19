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
  // componentDidUpdate(prevState) {
  //   const { selectedValues } = this.state;
  //   const { selectedValues: prevSelectedvalues } = prevState;

  //   if (JSON.stringify(prevSelectedvalues) !== JSON.stringify(selectedValues)) {
  //     this.setState({
  //       selectedValues: Object.assign([], selectedValues),
  //       preSelectedValues: Object.assign([], selectedValues),
  //     });
  //   }
  // }

  getItem = (id) => {
    const option = this.state.options.find((item) => item.id === id);
    return option;
  };
  onSelect = (id) => {
    const tempOptions = [...this.state.options];
    const { selectedValues } = this.state;
    const index = tempOptions.indexOf(this.getItem(id));
    const selectedOption = tempOptions[index];
    if (selectedValues.length === 0) {
      this.setState(() => {
        return { selectedValues: [selectedOption] };
      });
    } else {
      this.setState(() => {
        return { selectedValues: [...selectedValues, selectedOption] };
      });
    }
  };

  onRemove = () => {
    console.log("click from onRemove");
  };

  render() {
    console.log("select value from app:", this.state.selectedValues.length);

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
          displayValue="name"
        ></MultiSelect>
      </div>
    );
  }
}

export default App;
