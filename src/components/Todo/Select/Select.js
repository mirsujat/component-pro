import React, { Component } from "react";
import Checkbox from "./Checkbox";

class Select extends Component {
  static defaultProps = {
    isMultiple: false,
    options: [],
    selectedValue: "",
    name: "",
    chips: false,
    menuOpen: false,
    deselect: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      isOpen: false,
      isMenuOpen: false,
    };
    this.toggleContainer = React.createRef();
  }

  // componentDidMount = () => {
  //   window.addEventListener("click", this.onClickOutSideToHidePopup);
  // };

  // componentWillUnmount = () => {
  //   window.removeEventListener("click", this.onClickOutSideToHidePopup);
  // };

  onClickinSideToShowPopup = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClickOutSideToHidePopup = (event) => {
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  };

  //menu open
  onMenuOpen = () => {
    this.setState((currentState) => ({
      isMenuOpen: !currentState.isMenuOpen,
    }));
  };

  onDeselect = (option) => {
    this.onClickinSideToShowPopup();
    this.props.deselect(option);

    return;
  };

  createChips = () => {
    const { selectedValue } = this.props;

    let chips = null;
    chips = selectedValue
      .filter((option) => option.isChecked === true)
      .map((option) => {
        return (
          <div
            className="chip"
            key={option.id}
            onClick={() => this.onDeselect(option)}
          >
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
  renderOptions = () => {
    const { options } = this.props;
    let renderOptionElem;
    renderOptionElem = options.map(this.createCheckbox);
    return renderOptionElem;
  };
  createCheckboxes = () => {
    const { menuOpen } = this.props;
    const { isMenuOpen, isOpen } = this.state;
    return (
      <div
        className="multiselect_container"
        ref={this.toggleContainer}
        onClick={menuOpen ? null : this.onClickinSideToShowPopup}
      >
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
              {isMenuOpen || isOpen ? (
                <span className="arrow-down" onClick={this.onMenuOpen}>
                  &#10093;
                </span>
              ) : (
                <span className="arrow-up" onClick={this.onMenuOpen}>
                  &#10092;
                </span>
              )}
            </div>

            <fieldset
              className={isMenuOpen || isOpen ? "option_box" : "hidden"}
            >
              {isMenuOpen || (isOpen && this.renderOptions())}
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
    console.log("selectedValue from select: ", this.props.selectedValue);
    return <div className="select_container">{this.renderSelect()}</div>;
  }
}

export default Select;
