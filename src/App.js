import React, { Component } from "react";

import "./App.css";
import Select from "./components/Todo/Select/Select";

// const options = {
//   options: [
//     { id: 1, name: "Apple" },
//     { id: 2, name: "Orange" },
//     { id: 3, name: "Banana" },
//     { id: 4, name: "Pineaple" },
//   ],
// };
const OPTIONS = ["One", "Two", "Three"];
class App extends Component {
  state = {
    selectedValue: "noPaymentMethod",
    options: [...OPTIONS],
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false,
      }),
      {}
    ),
  };

  handleSelectValue = (event) => {
    this.setState({
      selectedValue: event.target.value,
    });
  };
  handleCheckboxChange = (changeEvent) => {
    const { name } = changeEvent.target;

    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("You have submitted:", this.state.selectedValue);
  };

  render() {
    return (
      <div data-testid="app" className="app">
        <h1>Hello World</h1>
        <h3>Custom Select Component</h3>
        <Select
          isMultiple
          options={this.state.options}
          Checkboxes={this.state.checkboxes}
          handleCheckboxChange={this.handleCheckboxChange}
        ></Select>
      </div>
    );
  }
}

export default App;
