import React, { Component } from "react";

class MultiSelect extends Component {
  static defaultProps = {
    options: [],
    isMultiple: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      isOpen: false,
    };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
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
                  <li
                    key={option}
                    className="single_select_option"
                    style={{ cursor: "pointer" }}
                  >
                    <label className="custom_checkbox">
                      {option}
                      <input type="checkbox" />
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
                    key={option}
                    className="single_select_option"
                    style={{ cursor: "pointer" }}
                  >
                    {option}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
  }

  render() {
    return this.renderOptions();
  }
}

export default MultiSelect;
