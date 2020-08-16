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
      selectedOptions: Object.assign([], props.options),
      itemsSelected: [],
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
  selectedItem(item) {
    const { selectedOptions, itemsSelected } = this.state;
    const { onSelect } = this.props;
    const Items = [];
    const selectedItems = selectedOptions.find(
      (option) => option.id === item.id
    );

    this.setState({
      itemsSelected: Items,
    });
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
                    key={option.id}
                    className="single_select_option"
                    style={{ cursor: "pointer" }}
                  >
                    <label
                      className="custom_checkbox"
                      onClick={() => this.selectedItem(option)}
                    >
                      {option.value}
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
                    key={option.id}
                    className="single_select_option"
                    style={{ cursor: "pointer" }}
                  >
                    {option.value}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log("itemsSelected: ", this.state.itemsSelected);
    return this.renderOptions();
  }
}

export default MultiSelect;
