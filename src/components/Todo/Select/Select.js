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
      chips: [],
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
    const { checkboxes } = this.props;

    let tempObj, tempArray;
    tempArray = Object.entries(checkboxes);
    tempObj = tempArray.filter((item) => {
      if (item[1] === true) {
        return item[0];
      }
      return tempObj;
    });

    let chips = null;
    chips = tempObj.map((option) => {
      if (typeof option === "undefined") {
        return null;
      } else {
        return (
          <span
            key={Math.random()}
            className="chip"
            onClick={() => this.props.deselect(option)}
          >
            {option}
          </span>
        );
      }
    });
    return chips;
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
    const { chips } = this.props;
    return (
      <div className="multiselect_container" ref={this.toggleContainer}>
        {chips ? this.createChips() : null}
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
    console.log("selected : ", this.props.checkboxes);

    return <div className="select_container">{this.renderSelect()}</div>;
  }
}

export default Select;
