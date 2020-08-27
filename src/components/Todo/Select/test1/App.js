import React, { Component } from "react";

import "./App.css";
import Select from "./Select";

const OPTIONS = ["Coding", "Music", "Sports", "Arts", "Cooking", "Travel"];
class App extends Component {
  state = {
    PaymentMethod: "noPaymentMethod",
    options: [...OPTIONS],
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false,
      }),
      {}
    ),
  };

  //input change heandler
  onChangeHandler = (event) => {
    const { name } = event.target;
    //Multiselect
    if (event.target.type === "checkbox") {
      this.setState((prevState) => ({
        checkboxes: {
          ...prevState.checkboxes,
          [name]: !prevState.checkboxes[name],
        },
      }));
    } else {
      //Default select and other input
      this.setState({
        [name]: event.target.value,
      });
    }
  };

  //Deselect ontion
  onDeselect = (option) => {
    console.log("deselect not Implemented");
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
          menuOpen
          options={this.state.options}
          checkboxes={this.state.checkboxes}
          onChange={this.onChangeHandler}
          selectedValue={this.state.PaymentMethod}
          deselect={this.onDeselect}
          name="PaymentMethod"
        ></Select>
      </div>
    );
  }
}

export default App;
