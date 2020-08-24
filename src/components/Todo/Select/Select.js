import React, { Component } from "react";
import Checkbox from "./Checkbox";

class Select extends Component {
  static defaultProps = {
    isMultiple: false,
    options: [],
    checkboxes: {},
    selectedValue: "",
    name: "",
    chips: false,
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
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  };

  onClickOutSideToHidePopup = (event) => {
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  };

  createChips = () => {
    const { options } = this.props;
    let chips = null;
    chips = options
      .filter((option) => option.isChecked === true)
      .map((option) => {
        return (
          <div className="chip" key={option.id}>
            <span className="chip_content">{option.value}</span>
            <span className="chip_close_icon">X</span>
          </div>
        );
      });
    return chips;
  };

  renderChips = () => {
    if (this.props.chips) {
      return <div className="chips_container">{this.createChips()}</div>;
    }
    return null;
  };
  createCheckbox = (option) => (
    <Checkbox
      label={option.value}
      isChecked={option.isChecked}
      onChange={this.props.onChange}
      key={option.id}
    />
  );

  createCheckboxes = () => {
    return (
      <div className="multiselect_container" ref={this.toggleContainer}>
        {this.renderChips()}
        <div className="custom_select">
          <div className="select_box">
            <div
              className="input-group"
              onClick={this.onClickinSideToShowPopup}
            >
              <input
                className="input_dropdown"
                type="text"
                placeholder="Choose your interests"
                readOnly
              ></input>
              {this.state.isOpen ? (
                <span className="arrow-down">&#10092;</span>
              ) : (
                <span className="arrow-up">&#10093;</span>
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
    console.log("Options: ", this.props.options);
    return <div className="select_container">{this.renderSelect()}</div>;
  }
}

export default Select;
