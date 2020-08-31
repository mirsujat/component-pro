import React, { Component } from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";

class Select extends Component {
  static defaultProps = {
    isMultiple: false,
    options: [],
    selectedValue: [],
    name: "",
    chips: false,
    placeholder: "Please Select...",
    placeholderChips: false,
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

  // Life cycle method
  componentDidMount = () => {
    if (this.props.menuOpen) {
      return;
    } else {
      window.addEventListener("click", this.onClickOutSideToHidePopup);
    }
    return;
  };
  // Life cycle method
  componentWillUnmount = () => {
    if (this.props.menuOpen) {
      return;
    } else {
      window.removeEventListener("click", this.onClickOutSideToHidePopup);
    }
    return;
  };

  //handler function open the menu when clicked in side the container
  onClickinSideToShowPopup = () => {
    this.setState({
      isOpen: true,
    });
  };

  //handler function close the menu when clicked out side the container
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
    this.setState((prevtState) => ({
      isMenuOpen: !prevtState.isMenuOpen,
    }));
  };

  //deselect option
  onDeselect = (option) => {
    this.props.deselect(option);
    return;
  };

  //create chips for selected options
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

  //render chips based on chips props
  renderChips = () => {
    const { chips, selectedValue } = this.props;
    if (chips && selectedValue.length > 0) {
      return <div className="chips_container">{this.createChips()}</div>;
    }
    return "No Option Selected!!";
  };

  //create chips for placeholder
  createChipsText = () => {
    const { selectedValue } = this.props;

    let chips = this.props.placeholder;
    chips = selectedValue
      .filter((option) => option.isChecked === true)
      .map((option) => {
        return (
          <span
            key={option.id}
            className="chip-content"
            onClick={() => this.onDeselect(option)}
          >
            {option.value} <i className="remove">X</i>
          </span>
        );
      });

    return chips;
  };

  //render placeholder chips base on placeholderChips props
  renderPlaceholderChips = () => {
    const { chips, selectedValue, placeholderChips } = this.props;
    if (placeholderChips && chips && selectedValue.length > 0) {
      return this.createChipsText();
    }
    return this.props.placeholder;
  };

  // create dropdown option with checkbox
  createCheckbox = (option) => (
    <Checkbox
      label={option.value}
      isChecked={option.isChecked}
      onChange={this.props.onChange}
      key={option.id}
    />
  );

  // render options
  renderOptions = () => {
    const { options } = this.props;
    let renderOptionElem;
    renderOptionElem = options.map(this.createCheckbox);
    return renderOptionElem;
  };

  //Dropdown indicator
  indicator = () => {
    const { isMenuOpen, isOpen } = this.state;
    let indicator = (
      <span className="arrow-down" onClick={this.onMenuOpen}>
        &#10093;
      </span>
    );
    if (isOpen || isMenuOpen) {
      indicator = (
        <span className="arrow-up" onClick={this.onMenuOpen}>
          &#10092;
        </span>
      );
    }
    return indicator;
  };

  // create options with checkboxes
  createCheckboxes = () => {
    const { menuOpen } = this.props;
    const { isMenuOpen, isOpen } = this.state;
    return (
      <div
        className="multiselect_container"
        ref={this.toggleContainer}
        onClick={() => (menuOpen ? null : this.onClickinSideToShowPopup)}
      >
        {this.renderChips()}

        <div className="custom_select">
          <div className="select_box">
            <div
              className="input-group"
              onClick={() => (menuOpen ? null : this.onClickinSideToShowPopup)}
            >
              {/* <input
                className="input_dropdown"
                type="text"
                placeholder={this.props.placeholder}
                onChange={() => {}}
                value={this.renderPlaceholderChips()}
              ></input>
              <div className="indicator">{this.indicator()}</div> */}
              <Input indicator={this.indicator()}>
                {this.renderPlaceholderChips()}
              </Input>
            </div>

            <fieldset
              className={isMenuOpen || isOpen ? "option_box" : "hidden"}
            >
              {isOpen || isMenuOpen ? this.renderOptions() : null}
            </fieldset>
          </div>
        </div>
      </div>
    );
  };

  //render select component
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
    console.log("placeholderChips: ", this.renderPlaceholderChips());
    return <div className="select_container">{this.renderSelect()}</div>;
  }
}

export default Select;
