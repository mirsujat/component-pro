import React, { Component } from "react";

class MultiSelect extends Component {
  static defaultProps = {
    options: [],
    isMultiple: false,
    isObject: true,
    displayValue: "model",
    selectedValues: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedValues: Object.assign([], props.selectedValues),
      selectedOption: null,
      isOpen: false,
    };
    this.toggleContainer = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
  }

  componentDidUpdate(prevProps) {
    const { options, selectedValues } = this.props;
    const {
      options: prevOptions,
      selectedValues: prevSelectedvalues,
    } = prevProps;
    if (JSON.stringify(prevOptions) !== JSON.stringify(options)) {
      this.setState({
        options,
      });
    }
    if (JSON.stringify(prevSelectedvalues) !== JSON.stringify(selectedValues)) {
      this.setState({
        selectedValues: Object.assign([], selectedValues),
        preSelectedValues: Object.assign([], selectedValues),
      });
    }
  }

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
  selectItemHandler = (id) => {
    const { onSelect } = this.props;
    if (this.isSelectedValue(id)) {
      return;
    }
    onSelect(id);
  };

  isSelectedValue(id) {
    const { selectedValues } = this.state;
    return selectedValues.filter((i) => i.id === id).length > 0;
  }

  renderOptions() {
    const { options } = this.state;
    const { isMultiple } = this.props;
    if (isMultiple) {
      return (
        <div className="custom_select" ref={this.toggleContainer}>
          <div className="select_box" style={{ width: 200 }}>
            <input
              className="select_input"
              type="text"
              placeholder="Select an Option"
              onClick={this.onClickHandler}
            ></input>

            <ul className={this.state.isOpen ? "option_box" : "hidden"}>
              {this.state.isOpen &&
                options.map((option, i) => (
                  <li key={option.id} className="single_select_option">
                    <label
                      className="custom_checkbox"
                      onClick={() => this.selectItemHandler(option.id)}
                    >
                      {option.name}
                      <input type="checkbox" readOnly onChange={() => {}} />
                      <span className="checkmark"></span>
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="custom_select" ref={this.toggleContainer}>
          <div className="select_box" style={{ width: 200 }}>
            <input
              className="select_input"
              type="text"
              placeholder="Select an Option"
              onClick={this.onClickHandler}
            ></input>
            <ul className="option_box">
              {this.state.isOpen &&
                options.map((option, i) => (
                  <li
                    key={option.id}
                    className="single_select_option"
                    style={{ cursor: "pointer" }}
                  >
                    {option.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log("selectedValues:", this.props.selectedValues);
    return this.renderOptions();
  }
}

export default MultiSelect;
