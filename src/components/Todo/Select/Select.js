import React, { Component } from "react";
import Checkbox from "./Checkbox";

class Select extends Component {
  static defaultProps = {
    isMultiple: false,
    options: [],
    checkboxes: {},
    selectedValue: "",
    name: "",
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
      onChange={this.props.onChange}
      key={option}
    />
  );

  createCheckboxes = () => {
    return (
      <div className="multiselect_container" ref={this.toggleContainer}>
        <div className="custom_select">
          <div className="select_box">
            <div className="input-group">
              <input
                className="input_dropdown"
                type="text"
                placeholder="Choose your interests"
                onClick={this.onClickinSideToShowPopup}
              ></input>
              {this.state.isOpen ? (
                <span className="arrow-up">&#10093;</span>
              ) : (
                <span className="arrow-down">&#10092;</span>
              )}
            </div>

            <fieldset className={this.state.isOpen ? "option_box" : "hidden"}>
              {this.state.isOpen && this.state.options.map(this.createCheckbox)}
            </fieldset>
          </div>
        </div>
      </div>
    );
  };

  renderSelect = () => {
    if (this.props.isMultiple) return this.createCheckboxes();
    return (
      <select
        name={this.props.name}
        value={this.props.selectedValue}
        onChange={this.props.onChange}
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
