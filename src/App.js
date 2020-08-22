import React, { Component } from "react";

import "./App.css";
import Select from "./components/Todo/Select/Select";

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

  //Default select
  handleSelectValue = (event) => {
    this.setState({
      selectedValue: event.target.value,
    });
  };
  //Multiselect
  handleCheckboxChange = (event) => {
    const { name } = event.target;
    //
    if (event.target.type === "checkbox") {
      this.setState((prevState) => ({
        checkboxes: {
          ...prevState.checkboxes,
          [name]: !prevState.checkboxes[name],
        },
      }));
    } else {
      this.setState({
        selectedValue: event.target.value,
      });
    }
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
          selectedValue={this.state.selectedValue}
        ></Select>
      </div>
    );
  }
}

export default App;
