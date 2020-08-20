import React, { Component } from "react";

class Select extends Component {
  static defaultProps = {
    isMultple: false,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSelect() {
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
