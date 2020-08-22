import React, { Component } from "react";
import Checkbox from "./Checkbox";

class Select extends Component {
  static defaultProps = {
    isMultiple: false,
    options: [],
    checkboxes: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      checkboxes: props.checkboxes,
      isOpen: false,
    };
    this.toggleContainer = React.createRef();
  }

  componentDidMount = () => {
    window.addEventListener("click", this.onClickOutSideToHidePopup);
  };

  componentWillUnmount = () => {
    window.removeEventListener("click", this.onClickOutSideToHidePopup);
  };

  onClickinSideToShowPopup = () => {
    this.setState({ isOpen: true });
  };

  onClickOutSideToHidePopup = (event) => {
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  };

  createCheckbox = (option) => (
    <Checkbox
      label={option}
      isSelected={this.props.checkboxes[option]}
      onCheckboxChange={this.props.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => {
    return (
      <div className="multiselect_container" ref={this.toggleContainer}>
        <div className="custom_select">
          <div className="select_box">
            <input
              className="select_input"
              type="text"
              placeholder="Select an Option"
              onClick={this.onClickinSideToShowPopup}
            ></input>
            <ul className={this.state.isOpen ? "option_box" : "hidden"}>
              {this.state.isOpen && this.state.options.map(this.createCheckbox)}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  renderSelect = () => {
    if (this.props.isMultiple) return this.createCheckboxes();
    return (
      <select
        value={this.state.selectedValue}
        onChange={this.handleSelectValue}
        className="form-control"
        id="paymentMethod"
      >
        <option value="noPaymentMethod">Select payment method</option>
        <option value="creditCard">Credit Card</option>
        <option value="debitCard">Debit Card</option>
        <option value="bankTransfer">Bank Transfer</option>
      </select>
    );
  };

  render() {
    return <div className="select_container">{this.renderSelect()}</div>;
  }
}

export default Select;
