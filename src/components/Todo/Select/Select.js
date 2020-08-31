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
    menuAlive: false, //keeps the menu open when select items
    focus: false,
    blur: false,
    deselect: () => {},
  };
  constructor(props) {
    super(props);

    this.state = {
      options: props.options,
      isOpen: false,
      menuAlive: false,
    };
    this.toggleContainer = React.createRef();
    this.timeOutId = null;
  }

  // Life cycle method
  componentDidMount = () => {
    const { menuAlive, focus, blur } = this.props;
    if (menuAlive || focus || blur) {
      return;
    } else {
      window.addEventListener("click", this.onClickOutSideToHidePopup);
    }
    return;
  };
  // Life cycle method
  componentWillUnmount = () => {
    const { menuAlive, focus, blur } = this.props;
    if (menuAlive || focus || blur) {
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

  //Handler method for onFocus
  onClickHandler = () => {
    this.setState((currentState) => ({
      isOpen: true,
    }));
  };

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false,
      });
    }, 200);
  };

  // If a child receives focus, do not close the popover.
  onFocusHandler = () => {
    clearTimeout(this.timeOutId);
  };

  //menu open
  onMenuOpen = () => {
    const { menuAlive } = this.props;
    if (menuAlive) {
      this.setState((prevtState) => ({
        menuAlive: !prevtState.menuAlive,
      }));
    }
    return;
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

    if (chips && selectedValue.find((option) => option.isChecked === true)) {
      return <div className="chips_container">{this.createChips()}</div>;
    }
    return;
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
    if (
      placeholderChips &&
      chips &&
      selectedValue.find((option) => option.isChecked === true)
    ) {
      return this.createChipsText();
    }
    return <span className="placeholder-text">{this.props.placeholder}</span>;
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
    const { menuAlive, isOpen } = this.state;
    let indicator = (
      <span className="arrow-down" onClick={this.onMenuOpen}>
        &#10093;
      </span>
    );
    if (isOpen || menuAlive) {
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
    const { menuAlive, focus, blur } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        className="multiselect_container"
        ref={this.toggleContainer}
        onClick={() =>
          menuAlive || focus || blur ? null : this.onClickinSideToShowPopup
        }
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
      >
        {this.renderChips()}

        <div className="custom_select">
          <div className="select_box">
            <div
              className="input-group"
              onClick={() =>
                menuAlive || focus || blur
                  ? null
                  : this.onClickinSideToShowPopup
              }
            >
              {/* <input
                className="input_dropdown"
                type="text"
                placeholder={this.props.placeholder}
                onChange={() => {}}
                value={this.renderPlaceholderChips()}
              ></input>
              <div className="indicator">{this.indicator()}</div> */}
              <Input
                indicator={this.indicator()}
                open={isOpen || menuAlive}
                onClick={this.onClickHandler}
              >
                {this.renderPlaceholderChips()}
              </Input>

              <fieldset
                className={menuAlive || isOpen ? "option_box" : "hidden"}
              >
                {isOpen || menuAlive ? this.renderOptions() : null}
              </fieldset>
            </div>
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
    return <div className="select_container">{this.renderSelect()}</div>;
  }
}

export default Select;
