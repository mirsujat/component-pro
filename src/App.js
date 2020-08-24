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
];

class App extends Component {
  state = {
    PaymentMethod: "noPaymentMethod",
    options: [...INTERESTS],
  };

  onChange = (event) => {
    const options = this.state.options;
    const { name, value } = event.target;
    if (event.target.type === "checkbox") {
      options.forEach((option) => {
        if (option.value === event.target.value)
          option.isChecked = event.target.checked;
      });
      this.setState({ options: options });
    } else {
      this.setState({ [name]: value });
    }
  };

  deselect = (item) => {
    const { options } = this.state;
    options.forEach((option) => {
      if (option.id === item.id) {
        option.isChecked = false;
      }
    });
    this.setState({ options: options });
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
          chips
          options={this.state.options}
          onChange={this.onChange}
          deselect={this.deselect}
        ></Select>
      </div>
    );
  }
}

export default App;
