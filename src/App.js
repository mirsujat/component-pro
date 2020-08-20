import React, { Component } from "react";

import "./App.css";
import Select from "./components/Todo/Select/Select";

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
    selectedValue: "noPaymentMethod",
  };

  handleSelectValue = (event) => {
    this.setState({
      selectedValue: event.target.value,
    });
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
        <Select></Select>
      </div>
    );
  }
}

export default App;
