import React, { Component } from "react";

import "./App.css";
import Select from "./components/Todo/Select/Select";

const INTERESTS = [
  { id: 1, value: "Coding", isChecked: false },
  { id: 2, value: "Reading", isChecked: false },
  { id: 3, value: "Writing", isChecked: false },
  { id: 4, value: "Sports", isChecked: false },
  { id: 5, value: "Movies", isChecked: false },
  { id: 6, value: "Travelling", isChecked: false },
  { id: 7, value: "Cooking", isChecked: false },
  { id: 8, value: "Swimming", isChecked: false },
];

class App extends Component {
  state = {
    PaymentMethod: "noPaymentMethod",
    options: [...INTERESTS],
    selectedValue: [],
  };

  onChange = (event) => {
    const options = INTERESTS;

    const { name, value } = event.target;
    if (event.target.type === "checkbox") {
      options.filter((option) => {
        if (option.value === event.target.value) {
          return (option.isChecked = event.target.checked);
        }
        return options;
      });

      this.setState({ selectedValue: options });
    } else {
      this.setState({ [name]: value });
    }
  };

  deselect = (item) => {
    this.setState((state, prevState) => {
      const selectedValue = state.selectedValue
        .filter((option, i) => option.id === item.id)
        .map((option) => (option.isChecked = false));
      return [...state.selectedValue, selectedValue];
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("You have submitted:", this.state.selectedValue);
  };

  render() {
    console.log("options form App: ", this.state.options);
    return (
      <div data-testid="app" className="app">
        <h1>Hello World</h1>
        <h3>Custom Select Component</h3>

        <Select
          isMultiple
          focus
          blur
          chips
          placeholderChips
          options={INTERESTS}
          onChange={this.onChange}
          selectedValue={this.state.selectedValue}
          deselect={this.deselect}
        ></Select>
      </div>
    );
  }
}

export default App;
