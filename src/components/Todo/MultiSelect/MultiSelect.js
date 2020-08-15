import React, { Component } from "react";

class MultiSelect extends Component {
  static defaultProps = {
    options: [],
    selectedValues: [],
    isMultiple: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      filteredOptions: props.options,
      selectedValues: Object.assign([], props.selectedValues),
    };
  }
  isSelectedValue(item) {
    const { isObject, displayValue } = this.props;
    const { selectedValues } = this.state;
    if (isObject) {
      return (
        selectedValues.filter((i) => i[displayValue] === item[displayValue])
          .length > 0
      );
    }
    return selectedValues.filter((i) => item).length > 0;
  }

  renderOptions() {
    const { options } = this.state;
    if (this.props.isMultiple) {
      return (
        <select className="custom_select">
          {options.map((option, i) => (
            <div className="select_option" key={option}>
              {/* <div className="checkbox_container">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.isSelectedValue(option)}
                  readOnly
                ></input>
               
              </div> */}
              <option className="multiple_select_option">{option}</option>
            </div>
          ))}
        </select>
      );
    } else {
      return (
        <select className="custom_select">
          {options.map((option, i) => (
            <option key={option} className="single_select_option">
              {option}
            </option>
          ))}
        </select>
      );
    }
  }

  render() {
    return this.renderOptions();
  }
}

export default MultiSelect;
