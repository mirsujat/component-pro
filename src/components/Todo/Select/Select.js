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
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
  }

  // componentDidUpdate(prevProps) {
  //   const { options, selectedValues } = this.props;
  //   const {
  //     options: prevOptions,
  //     selectedValues: prevSelectedvalues,
  //   } = prevProps;
  //   if (JSON.stringify(prevOptions) !== JSON.stringify(options)) {
  //     this.setState({
  //       options,
  //     });
  //   }
  //   if (JSON.stringify(prevSelectedvalues) !== JSON.stringify(selectedValues)) {
  //     this.setState({
  //       selectedValues: Object.assign([], selectedValues),
  //       preSelectedValues: Object.assign([], selectedValues),
  //     });
  //   }
  // }

  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  }

  onClickOutsideHandler(event) {
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  }

  //  onChangeHandler = (event) => {
  //     this.props.handleCheckboxChange(event);
  //   };

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
              onClick={this.onClickHandler}
            ></input>
            <ul className={this.state.isOpen ? "option_box" : "hidden"}>
              {this.state.isOpen && this.state.options.map(this.createCheckbox)}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  renderSelect() {
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
  }

  render() {
    return <div className="select_container">{this.renderSelect()}</div>;
  }
}

export default Select;
